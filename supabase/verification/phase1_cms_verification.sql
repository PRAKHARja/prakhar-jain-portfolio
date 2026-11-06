-- Read-only verification for Phase 1. Run after applying the migration.
-- It does not read environment variables or change database state.

-- 1. Inspect existing prerequisite columns and constraints.
select table_name, column_name, data_type, udt_name, is_nullable, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name in ('admin_users', 'projects')
order by table_name, ordinal_position;

select tc.table_name, tc.constraint_name, tc.constraint_type,
       string_agg(kcu.column_name, ', ' order by kcu.ordinal_position) as columns
from information_schema.table_constraints tc
left join information_schema.key_column_usage kcu
  on kcu.constraint_schema = tc.constraint_schema
 and kcu.constraint_name = tc.constraint_name
 and kcu.table_name = tc.table_name
where tc.table_schema = 'public'
  and tc.table_name in ('admin_users', 'projects')
  and tc.constraint_type in ('PRIMARY KEY', 'UNIQUE', 'FOREIGN KEY', 'CHECK')
group by tc.table_name, tc.constraint_name, tc.constraint_type
order by tc.table_name, tc.constraint_type, tc.constraint_name;

-- 2. Confirm all 19 CMS tables exist and RLS is enabled.
with expected(table_name) as (
  values
    ('site_settings'), ('home_content'), ('about_content'), ('contact_settings'),
    ('education'), ('skill_categories'), ('skills'), ('experience'), ('services'),
    ('certifications'), ('achievements'), ('social_links'), ('navigation_items'),
    ('page_seo'), ('media_assets'), ('resume_documents'), ('project_case_studies'),
    ('content_revisions'), ('asset_cleanup_queue')
)
select expected.table_name,
       (c.oid is not null) as table_exists,
       coalesce(c.relrowsecurity, false) as rls_enabled,
       coalesce(c.relforcerowsecurity, false) as force_rls
from expected
left join pg_class c on c.oid = to_regclass(format('public.%I', expected.table_name))
order by expected.table_name;

-- 3. Review new policies and the unchanged prerequisite policies.
select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename in (
    'admin_users', 'projects', 'site_settings', 'home_content', 'about_content',
    'contact_settings', 'education', 'skill_categories', 'skills', 'experience',
    'services', 'certifications', 'achievements', 'social_links', 'navigation_items',
    'page_seo', 'media_assets', 'resume_documents', 'project_case_studies',
    'content_revisions', 'asset_cleanup_queue'
  )
order by tablename, policyname;

-- 4. Confirm the authorization helper is SECURITY DEFINER, has a pinned search
-- path, and is callable only by authenticated clients.
select p.proname,
       p.prosecdef as security_definer,
       p.proconfig as function_settings,
       has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can_execute,
       has_function_privilege('authenticated', p.oid, 'EXECUTE') as authenticated_can_execute
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('cms_is_admin', 'cms_set_updated_at')
order by p.proname;

-- 5. Confirm anonymous has no write table grants. Authenticated table grants are
-- constrained by the admin-membership RLS policies; this query does not impersonate a user.
select table_name,
       has_table_privilege('anon', format('public.%I', table_name), 'INSERT') as anon_can_insert,
       has_table_privilege('anon', format('public.%I', table_name), 'UPDATE') as anon_can_update,
       has_table_privilege('anon', format('public.%I', table_name), 'DELETE') as anon_can_delete,
       has_table_privilege('authenticated', format('public.%I', table_name), 'INSERT') as authenticated_has_insert_grant,
       has_table_privilege('authenticated', format('public.%I', table_name), 'UPDATE') as authenticated_has_update_grant,
       has_table_privilege('authenticated', format('public.%I', table_name), 'DELETE') as authenticated_has_delete_grant
from unnest(array[
  'site_settings', 'home_content', 'about_content', 'contact_settings',
  'education', 'skill_categories', 'skills', 'experience', 'services',
  'certifications', 'achievements', 'social_links', 'navigation_items', 'page_seo',
  'media_assets', 'resume_documents', 'project_case_studies', 'content_revisions',
  'asset_cleanup_queue'
]) as tables(table_name)
order by table_name;

-- 6. Confirm updated_at triggers exist on every mutable timestamped CMS table.
select event_object_table as table_name, trigger_name
from information_schema.triggers
where trigger_schema = 'public'
  and trigger_name = 'cms_set_updated_at'
order by event_object_table;

-- The migration does not write to projects. Compare this count with a
-- pre-migration backup/snapshot if you need record-level proof.
select count(*) as projects_count from public.projects;
