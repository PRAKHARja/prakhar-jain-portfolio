export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Relationship<
  Name extends string,
  Columns extends string[],
  ReferencedTable extends string,
  ReferencedColumns extends string[],
  OneToOne extends boolean = false,
> = {
  foreignKeyName: Name;
  columns: Columns;
  isOneToOne: OneToOne;
  referencedRelation: ReferencedTable;
  referencedColumns: ReferencedColumns;
};

type Table<Row, RequiredInsertKeys extends keyof Row = never, Relations = []> = {
  Row: Row;
  Insert: Pick<Row, RequiredInsertKeys> & Partial<Omit<Row, RequiredInsertKeys>>;
  Update: Partial<Row>;
  Relationships: Relations;
};

type Timestamps = { created_at: string; updated_at: string };
type PublishedVisibility = { published: boolean; is_visible: boolean };

export type Database = {
  public: {
    Tables: {
      admin_users: Table<{ user_id: string; created_at: string }, "user_id">;
      projects: Table<
        {
          id: string;
          slug: string;
          title: string;
          summary: string;
          description: string;
          technologies: string[];
          github_url: string | null;
          live_url: string | null;
          thumbnail_path: string | null;
          featured: boolean;
          published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        },
        "slug" | "title" | "summary" | "description" | "technologies"
      >;
      site_settings: Table<
        {
          id: number;
          content: Json;
          brand_logo_asset_id: string | null;
          profile_asset_id: string | null;
          favicon_asset_id: string | null;
          default_og_asset_id: string | null;
          schema_version: number;
          published: boolean;
          is_visible: boolean;
        } & Timestamps,
        never,
        [
          Relationship<"site_settings_brand_logo_asset_id_fkey", ["brand_logo_asset_id"], "media_assets", ["id"]>,
          Relationship<"site_settings_profile_asset_id_fkey", ["profile_asset_id"], "media_assets", ["id"]>,
          Relationship<"site_settings_favicon_asset_id_fkey", ["favicon_asset_id"], "media_assets", ["id"]>,
          Relationship<"site_settings_default_og_asset_id_fkey", ["default_og_asset_id"], "media_assets", ["id"]>,
        ]
      >;
      home_content: Table<
        { id: number; content: Json; schema_version: number; published: boolean; is_visible: boolean } & Timestamps
      >;
      about_content: Table<
        { id: number; content: Json; schema_version: number; published: boolean; is_visible: boolean } & Timestamps
      >;
      contact_settings: Table<
        { id: number; content: Json; schema_version: number; published: boolean; is_visible: boolean } & Timestamps
      >;
      education: Table<
        {
          id: string;
          institution: string;
          qualification: string;
          field_of_study: string | null;
          location: string | null;
          start_date: string | null;
          end_date: string | null;
          summary: string;
          sort_order: number;
          published: boolean;
          is_visible: boolean;
        } & Timestamps,
        "institution" | "qualification"
      >;
      skill_categories: Table<
        { id: string; name: string; description: string; sort_order: number } & PublishedVisibility & Timestamps,
        "name"
      >;
      skills: Table<
        { id: string; category_id: string; name: string; description: string; sort_order: number } & PublishedVisibility & Timestamps,
        "category_id" | "name",
        [Relationship<"skills_category_id_fkey", ["category_id"], "skill_categories", ["id"]>]
      >;
      experience: Table<
        {
          id: string;
          role_title: string;
          company: string;
          location: string | null;
          start_date: string | null;
          end_date: string | null;
          is_current: boolean;
          summary: string;
          responsibilities: string[];
          sort_order: number;
          published: boolean;
          is_visible: boolean;
        } & Timestamps,
        "role_title" | "company"
      >;
      services: Table<
        { id: string; title: string; summary: string; href: string | null; sort_order: number } & PublishedVisibility & Timestamps,
        "title"
      >;
      certifications: Table<
        {
          id: string;
          name: string;
          issuer: string;
          issued_at: string | null;
          expires_at: string | null;
          credential_url: string | null;
          details: string;
          media_asset_id: string | null;
          sort_order: number;
          published: boolean;
          is_visible: boolean;
        } & Timestamps,
        "name" | "issuer",
        [Relationship<"certifications_media_asset_id_fkey", ["media_asset_id"], "media_assets", ["id"]>]
      >;
      achievements: Table<
        {
          id: string;
          title: string;
          organization: string | null;
          achieved_at: string | null;
          summary: string;
          reference_url: string | null;
          media_asset_id: string | null;
          sort_order: number;
          published: boolean;
          is_visible: boolean;
        } & Timestamps,
        "title",
        [Relationship<"achievements_media_asset_id_fkey", ["media_asset_id"], "media_assets", ["id"]>]
      >;
      social_links: Table<
        { id: string; platform: string; label: string; url: string; sort_order: number } & PublishedVisibility & Timestamps,
        "platform" | "label" | "url"
      >;
      navigation_items: Table<
        {
          id: string;
          location: "header" | "footer";
          label: string;
          href: string;
          opens_new_tab: boolean;
          sort_order: number;
          published: boolean;
          is_visible: boolean;
        } & Timestamps,
        "location" | "label" | "href"
      >;
      page_seo: Table<
        {
          route_path: string;
          title: string;
          description: string;
          open_graph_title: string | null;
          open_graph_description: string | null;
          open_graph_asset_id: string | null;
          no_index: boolean;
          published: boolean;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        },
        "route_path" | "title",
        [Relationship<"page_seo_open_graph_asset_id_fkey", ["open_graph_asset_id"], "media_assets", ["id"]>]
      >;
      media_assets: Table<
        {
          id: string;
          bucket_id: string;
          storage_path: string;
          original_filename: string;
          content_type: string;
          byte_size: number;
          alt_text: string;
          is_public: boolean;
          published: boolean;
          is_visible: boolean;
          uploaded_by: string | null;
          created_at: string;
          updated_at: string;
        },
        "bucket_id" | "storage_path" | "original_filename" | "content_type" | "byte_size"
      >;
      resume_documents: Table<
        {
          id: string;
          media_asset_id: string;
          display_name: string;
          version_label: string | null;
          sort_order: number;
          published: boolean;
          is_visible: boolean;
        } & Timestamps,
        "media_asset_id" | "display_name",
        [Relationship<"resume_documents_media_asset_id_fkey", ["media_asset_id"], "media_assets", ["id"]>]
      >;
      project_case_studies: Table<
        {
          project_id: string;
          category: string;
          status: string;
          visual_kind: string | null;
          problem: string;
          goals: string[];
          contribution: string;
          features: string[];
          implementation: string;
          verification: string;
          limitations: string[];
          future: string[];
          hero_asset_id: string | null;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        },
        "project_id",
        [
          Relationship<"project_case_studies_project_id_fkey", ["project_id"], "projects", ["id"], true>,
          Relationship<"project_case_studies_hero_asset_id_fkey", ["hero_asset_id"], "media_assets", ["id"]>,
        ]
      >;
      content_revisions: Table<
        {
          id: string;
          entity_table: string;
          record_key: string;
          revision_number: number;
          action: "insert" | "update" | "delete" | "restore";
          snapshot: Json;
          created_by: string | null;
          created_at: string;
        },
        "entity_table" | "record_key" | "revision_number" | "action" | "snapshot"
      >;
      asset_cleanup_queue: Table<
        {
          id: string;
          bucket_id: string;
          storage_path: string;
          reason: string;
          attempt_count: number;
          last_error: string | null;
          requested_by: string | null;
        } & Timestamps,
        "bucket_id" | "storage_path" | "reason"
      >;
    };
    Views: Record<string, never>;
    Functions: {
      cms_is_admin: { Args: Record<PropertyKey, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
