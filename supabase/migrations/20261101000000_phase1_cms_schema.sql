-- Phase 1 CMS schema. This migration creates only new CMS tables and policies.
-- It deliberately does not alter projects, admin_users, or Storage policies.
begin;

do $preflight$
declare
  existing_table_name text;
  row_security_enabled boolean;
begin
  if to_regclass('public.admin_users') is null then
    raise exception 'CMS migration stopped: public.admin_users does not exist.';
  end if;
  if to_regclass('public.projects') is null then
    raise exception 'CMS migration stopped: public.projects does not exist.';
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'admin_users'
      and column_name = 'user_id' and data_type = 'uuid'
  ) then
    raise exception 'CMS migration stopped: public.admin_users.user_id must be UUID.';
  end if;
  if not exists (
    select 1
    from pg_index i
    join pg_attribute a
      on a.attrelid = i.indrelid and a.attname = 'user_id' and not a.attisdropped
    where i.indrelid = 'public.admin_users'::regclass
      and i.indisunique and i.indisvalid and i.indpred is null
      and i.indnkeyatts = 1 and i.indkey[0] = a.attnum
  ) then
    raise exception 'CMS migration stopped: public.admin_users.user_id must be a single-column PRIMARY KEY or UNIQUE constraint.';
  end if;

  -- Match the locally documented projects shape before adding its case-study FK.
  -- Extra live columns are allowed, but every existing application column must match.
  if exists (
    select expected.column_name
    from (values
      ('id', 'uuid', 'NO'),
      ('slug', 'text', 'NO'),
      ('title', 'text', 'NO'),
      ('summary', 'text', 'NO'),
      ('description', 'text', 'NO'),
      ('technologies', 'ARRAY', 'NO'),
      ('github_url', 'text', 'YES'),
      ('live_url', 'text', 'YES'),
      ('thumbnail_path', 'text', 'YES'),
      ('featured', 'boolean', 'NO'),
      ('published', 'boolean', 'NO'),
      ('sort_order', 'integer', 'NO'),
      ('created_at', 'timestamp with time zone', 'NO'),
      ('updated_at', 'timestamp with time zone', 'NO')
    ) as expected(column_name, data_type, is_nullable)
    left join information_schema.columns actual
      on actual.table_schema = 'public'
      and actual.table_name = 'projects'
      and actual.column_name = expected.column_name
    where actual.column_name is null
       or actual.data_type <> expected.data_type
       or actual.is_nullable <> expected.is_nullable
  ) then
    raise exception 'CMS migration stopped: public.projects does not match the expected application columns and nullability. Compare supabase/README.md with the live schema before retrying.';
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'projects'
      and column_name = 'id' and data_type = 'uuid'
  ) then
    raise exception 'CMS migration stopped: public.projects.id must be UUID.';
  end if;
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'projects'
      and column_name = 'slug' and data_type = 'text'
  ) then
    raise exception 'CMS migration stopped: public.projects.slug must be TEXT.';
  end if;
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'projects'
      and column_name = 'published' and data_type = 'boolean'
  ) then
    raise exception 'CMS migration stopped: public.projects.published must be BOOLEAN.';
  end if;
  if not exists (
    select 1
    from pg_index i
    join pg_attribute a
      on a.attrelid = i.indrelid and a.attname = 'id' and not a.attisdropped
    where i.indrelid = 'public.projects'::regclass
      and i.indisunique and i.indisvalid and i.indpred is null
      and i.indnkeyatts = 1 and i.indkey[0] = a.attnum
  ) then
    raise exception 'CMS migration stopped: public.projects.id must have a single-column PRIMARY KEY or UNIQUE constraint.';
  end if;
  if not exists (
    select 1
    from pg_index i
    join pg_attribute a
      on a.attrelid = i.indrelid and a.attname = 'slug' and not a.attisdropped
    where i.indrelid = 'public.projects'::regclass
      and i.indisunique and i.indisvalid and i.indpred is null
      and i.indnkeyatts = 1 and i.indkey[0] = a.attnum
  ) then
    raise exception 'CMS migration stopped: public.projects.slug must have a single-column UNIQUE constraint.';
  end if;

  select c.relrowsecurity into row_security_enabled
  from pg_class c where c.oid = 'public.admin_users'::regclass;
  if row_security_enabled is distinct from true then
    raise exception 'CMS migration stopped: RLS must already be enabled on public.admin_users.';
  end if;
  select c.relrowsecurity into row_security_enabled
  from pg_class c where c.oid = 'public.projects'::regclass;
  if row_security_enabled is distinct from true then
    raise exception 'CMS migration stopped: RLS must already be enabled on public.projects.';
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'admin_users'
      and cmd in ('SELECT', 'ALL')
  ) then
    raise exception 'CMS migration stopped: public.admin_users needs its existing self-read SELECT policy.';
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'projects'
      and cmd in ('SELECT', 'ALL')
      and (roles::text[] && array['anon', 'authenticated', 'public']::text[])
  ) then
    raise exception 'CMS migration stopped: public.projects needs its existing public-read SELECT policy for case-study visibility checks.';
  end if;

  foreach existing_table_name in array array[
    'site_settings', 'home_content', 'about_content', 'contact_settings',
    'education', 'skill_categories', 'skills', 'experience', 'services',
    'certifications', 'achievements', 'social_links', 'navigation_items',
    'page_seo', 'media_assets', 'resume_documents', 'project_case_studies',
    'content_revisions', 'asset_cleanup_queue'
  ] loop
    if to_regclass(format('public.%I', existing_table_name)) is not null then
      raise exception 'CMS migration stopped: public.% already exists. Inspect it before applying this migration.', existing_table_name;
    end if;
  end loop;

  if to_regprocedure('public.cms_set_updated_at()') is not null then
    raise exception 'CMS migration stopped: public.cms_set_updated_at() already exists. Inspect it before applying this migration.';
  end if;
  if to_regprocedure('public.cms_is_admin()') is not null then
    raise exception 'CMS migration stopped: public.cms_is_admin() already exists. Inspect it before applying this migration.';
  end if;
end;
$preflight$;

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket_id text not null,
  storage_path text not null,
  original_filename text not null,
  content_type text not null,
  byte_size bigint not null check (byte_size >= 0),
  alt_text text not null default '',
  is_public boolean not null default false,
  published boolean not null default false,
  is_visible boolean not null default true,
  uploaded_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint media_assets_bucket_path_key unique (bucket_id, storage_path)
);

create table public.site_settings (
  id smallint primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object'),
  brand_logo_asset_id uuid references public.media_assets (id) on delete set null,
  profile_asset_id uuid references public.media_assets (id) on delete set null,
  favicon_asset_id uuid references public.media_assets (id) on delete set null,
  default_og_asset_id uuid references public.media_assets (id) on delete set null,
  schema_version integer not null default 1 check (schema_version > 0),
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.home_content (
  id smallint primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object'),
  schema_version integer not null default 1 check (schema_version > 0),
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.about_content (
  id smallint primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object'),
  schema_version integer not null default 1 check (schema_version > 0),
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_settings (
  id smallint primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object'),
  schema_version integer not null default 1 check (schema_version > 0),
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  qualification text not null,
  field_of_study text,
  location text,
  start_date date,
  end_date date,
  summary text not null default '',
  sort_order integer not null default 0,
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint education_date_order_check check (end_date is null or start_date is null or end_date >= start_date)
);

create table public.skill_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  sort_order integer not null default 0,
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index skill_categories_name_ci_key on public.skill_categories (lower(name));

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.skill_categories (id) on delete cascade,
  name text not null,
  description text not null default '',
  sort_order integer not null default 0,
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index skills_category_name_ci_key on public.skills (category_id, lower(name));

create table public.experience (
  id uuid primary key default gen_random_uuid(),
  role_title text not null,
  company text not null,
  location text,
  start_date date,
  end_date date,
  is_current boolean not null default false,
  summary text not null default '',
  responsibilities text[] not null default '{}'::text[],
  sort_order integer not null default 0,
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint experience_date_order_check check (end_date is null or start_date is null or end_date >= start_date),
  constraint experience_current_end_date_check check (not is_current or end_date is null)
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null default '',
  href text,
  sort_order integer not null default 0,
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index services_title_ci_key on public.services (lower(title));

create table public.certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  issued_at date,
  expires_at date,
  credential_url text,
  details text not null default '',
  media_asset_id uuid references public.media_assets (id) on delete set null,
  sort_order integer not null default 0,
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint certifications_date_order_check check (expires_at is null or issued_at is null or expires_at >= issued_at)
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text,
  achieved_at date,
  summary text not null default '',
  reference_url text,
  media_asset_id uuid references public.media_assets (id) on delete set null,
  sort_order integer not null default 0,
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  label text not null,
  url text not null,
  sort_order integer not null default 0,
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint social_links_platform_url_key unique (platform, url)
);

create table public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  location text not null check (location in ('header', 'footer')),
  label text not null,
  href text not null,
  opens_new_tab boolean not null default false,
  sort_order integer not null default 0,
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint navigation_items_location_href_key unique (location, href)
);

create table public.page_seo (
  route_path text primary key check (route_path like '/%'),
  title text not null,
  description text not null default '',
  open_graph_title text,
  open_graph_description text,
  open_graph_asset_id uuid references public.media_assets (id) on delete set null,
  no_index boolean not null default false,
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.resume_documents (
  id uuid primary key default gen_random_uuid(),
  media_asset_id uuid not null references public.media_assets (id) on delete restrict,
  display_name text not null,
  version_label text,
  sort_order integer not null default 0,
  published boolean not null default false,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_case_studies (
  project_id uuid primary key references public.projects (id) on delete cascade,
  category text not null default '',
  status text not null default 'In development',
  visual_kind text,
  problem text not null default '',
  goals text[] not null default '{}'::text[],
  contribution text not null default '',
  features text[] not null default '{}'::text[],
  implementation text not null default '',
  verification text not null default '',
  limitations text[] not null default '{}'::text[],
  future text[] not null default '{}'::text[],
  hero_asset_id uuid references public.media_assets (id) on delete set null,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  entity_table text not null,
  record_key text not null,
  revision_number integer not null check (revision_number > 0),
  action text not null check (action in ('insert', 'update', 'delete', 'restore')),
  snapshot jsonb not null check (jsonb_typeof(snapshot) = 'object'),
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint content_revisions_entity_revision_key unique (entity_table, record_key, revision_number)
);

create table public.asset_cleanup_queue (
  id uuid primary key default gen_random_uuid(),
  bucket_id text not null,
  storage_path text not null,
  reason text not null,
  attempt_count integer not null default 0 check (attempt_count >= 0),
  last_error text,
  requested_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint asset_cleanup_queue_bucket_path_key unique (bucket_id, storage_path)
);

create function public.cms_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $function$
begin
  new.updated_at := pg_catalog.now();
  return new;
end;
$function$;
revoke all on function public.cms_set_updated_at() from public, anon, authenticated;

-- Avoid depending on the existing admin_users SELECT policy inside each CMS policy.
-- This function reveals only whether the caller's own auth.uid() is an admin.
create function public.cms_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select exists (
    select 1
    from public.admin_users au
    where au.user_id = (select auth.uid())
  );
$function$;
revoke all on function public.cms_is_admin() from public, anon, authenticated;
grant execute on function public.cms_is_admin() to authenticated;

do $updated_at_triggers$
declare
  table_name text;
begin
  foreach table_name in array array[
    'media_assets', 'site_settings', 'home_content', 'about_content', 'contact_settings',
    'education', 'skill_categories', 'skills', 'experience', 'services', 'certifications',
    'achievements', 'social_links', 'navigation_items', 'page_seo', 'resume_documents',
    'project_case_studies', 'asset_cleanup_queue'
  ] loop
    execute format(
      'create trigger cms_set_updated_at before update on public.%I for each row execute function public.cms_set_updated_at()',
      table_name
    );
  end loop;
end;
$updated_at_triggers$;

create index media_assets_public_created_idx
  on public.media_assets (created_at desc)
  where is_public and published and is_visible;
create index education_public_order_idx
  on public.education (sort_order, start_date desc)
  where published and is_visible;
create index skills_public_category_order_idx
  on public.skills (category_id, sort_order)
  where published and is_visible;
create index experience_public_order_idx
  on public.experience (sort_order, start_date desc)
  where published and is_visible;
create index services_public_order_idx
  on public.services (sort_order)
  where published and is_visible;
create index certifications_public_order_idx
  on public.certifications (sort_order, issued_at desc)
  where published and is_visible;
create index achievements_public_order_idx
  on public.achievements (sort_order, achieved_at desc)
  where published and is_visible;
create index social_links_public_order_idx
  on public.social_links (sort_order)
  where published and is_visible;
create index navigation_items_public_order_idx
  on public.navigation_items (location, sort_order)
  where published and is_visible;
create index resume_documents_public_order_idx
  on public.resume_documents (sort_order, created_at desc)
  where published and is_visible;
create index content_revisions_record_history_idx
  on public.content_revisions (entity_table, record_key, revision_number desc);
create index asset_cleanup_queue_created_idx
  on public.asset_cleanup_queue (created_at desc);

do $rls$
declare
  table_name text;
  public_tables text[] := array[
    'site_settings', 'home_content', 'about_content', 'contact_settings',
    'education', 'skill_categories', 'experience', 'services',
    'certifications', 'achievements', 'social_links', 'navigation_items', 'page_seo'
  ];
  admin_managed_tables text[] := array[
    'site_settings', 'home_content', 'about_content', 'contact_settings',
    'education', 'skill_categories', 'skills', 'experience', 'services',
    'certifications', 'achievements', 'social_links', 'navigation_items', 'page_seo'
  ];
begin
  foreach table_name in array array[
    'media_assets', 'site_settings', 'home_content', 'about_content', 'contact_settings',
    'education', 'skill_categories', 'skills', 'experience', 'services', 'certifications',
    'achievements', 'social_links', 'navigation_items', 'page_seo', 'resume_documents',
    'project_case_studies', 'content_revisions', 'asset_cleanup_queue'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all on table public.%I from anon, authenticated, public', table_name);
  end loop;

  foreach table_name in array public_tables loop
    execute format('grant select on table public.%I to anon, authenticated', table_name);
    execute format(
      'create policy cms_public_read_published on public.%I for select to anon, authenticated using (published and is_visible)',
      table_name
    );
  end loop;

  foreach table_name in array admin_managed_tables loop
    execute format('grant select, insert, update, delete on table public.%I to authenticated', table_name);
    execute format(
      'create policy cms_admin_manage on public.%I for all to authenticated using ((select public.cms_is_admin())) with check ((select public.cms_is_admin()))',
      table_name
    );
  end loop;
end;
$rls$;

grant select on table public.skills to anon, authenticated;
create policy cms_public_read_published_skills on public.skills
  for select to anon, authenticated
  using (
    published and is_visible and exists (
      select 1 from public.skill_categories sc
      where sc.id = skills.category_id and sc.published and sc.is_visible
    )
  );

grant select on table public.media_assets to anon, authenticated;
create policy cms_public_read_media_assets on public.media_assets
  for select to anon, authenticated
  using (is_public and published and is_visible);
grant select, insert, update, delete on table public.media_assets to authenticated;
create policy cms_admin_manage_media_assets on public.media_assets
  for all to authenticated
  using ((select public.cms_is_admin()))
  with check ((select public.cms_is_admin()));

grant select on table public.resume_documents to anon, authenticated;
create policy cms_public_read_resume_documents on public.resume_documents
  for select to anon, authenticated
  using (
    published and is_visible and exists (
      select 1 from public.media_assets ma
      where ma.id = resume_documents.media_asset_id and ma.is_public and ma.published and ma.is_visible
    )
  );
grant select, insert, update, delete on table public.resume_documents to authenticated;
create policy cms_admin_manage_resume_documents on public.resume_documents
  for all to authenticated
  using ((select public.cms_is_admin()))
  with check ((select public.cms_is_admin()));

grant select on table public.project_case_studies to anon, authenticated;
create policy cms_public_read_project_case_studies on public.project_case_studies
  for select to anon, authenticated
  using (
    is_visible and exists (
      select 1 from public.projects p
      where p.id = project_case_studies.project_id and p.published
    )
  );
grant select, insert, update, delete on table public.project_case_studies to authenticated;
create policy cms_admin_manage_project_case_studies on public.project_case_studies
  for all to authenticated
  using ((select public.cms_is_admin()))
  with check ((select public.cms_is_admin()));

grant select, insert on table public.content_revisions to authenticated;
create policy cms_admin_read_content_revisions on public.content_revisions
  for select to authenticated
  using ((select public.cms_is_admin()));
create policy cms_admin_add_content_revisions on public.content_revisions
  for insert to authenticated
  with check ((select public.cms_is_admin()));

grant select, insert, update, delete on table public.asset_cleanup_queue to authenticated;
create policy cms_admin_manage_asset_cleanup_queue on public.asset_cleanup_queue
  for all to authenticated
  using ((select public.cms_is_admin()))
  with check ((select public.cms_is_admin()));

comment on table public.site_settings is 'Singleton public site settings. Store only data intended for public display.';
comment on table public.home_content is 'Singleton homepage content payload. Validate its JSON shape in the CMS application.';
comment on table public.about_content is 'Singleton About page content payload. Validate its JSON shape in the CMS application.';
comment on table public.contact_settings is 'Singleton public contact page content. Do not store private contact submissions here.';
comment on table public.media_assets is 'CMS asset metadata. Bucket-level Storage policies still govern the actual objects.';
comment on table public.project_case_studies is 'Narrative fields for existing projects; title, slug, summary, description, technologies, links and thumbnail remain on public.projects.';
comment on table public.content_revisions is 'Append-only revision snapshots. Capture/restore workflows are introduced in a later CMS phase.';
comment on table public.asset_cleanup_queue is 'Admin-only retry queue for Storage object cleanup after database changes.';

commit;
