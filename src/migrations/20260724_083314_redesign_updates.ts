import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_page_copy_section_headers_key" AS ENUM('about', 'services', 'choose', 'work', 'projects', 'contact', 'testimonials', 'faq', 'blog');
  CREATE TYPE "public"."enum_home_page_why_choose_ratings_platform" AS ENUM('google', 'clutch', 'upwork', 'freelancer', 'trustpilot', 'g2', 'other');
  CREATE TYPE "public"."enum_home_page_why_choose_ctas_platform" AS ENUM('upwork', 'freelancer', 'clutch', 'google', 'linkedin', 'other');
  CREATE TABLE "home_page_copy_section_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_home_page_copy_section_headers_key" NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar
  );
  
  CREATE TABLE "home_page_copy_choose_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "home_page_copy_work_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "home_page_why_choose_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "home_page_why_choose_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"sublabel" varchar
  );
  
  CREATE TABLE "home_page_why_choose_ratings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_home_page_why_choose_ratings_platform" NOT NULL,
  	"score" varchar,
  	"count" varchar,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "home_page_why_choose_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_home_page_why_choose_ctas_platform" NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "site_settings" ADD COLUMN "topbar_working_hours" varchar;
  ALTER TABLE "home_page" ADD COLUMN "why_choose_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "why_choose_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "why_choose_highlight" varchar;
  ALTER TABLE "home_page" ADD COLUMN "why_choose_intro" varchar;
  ALTER TABLE "home_page_copy_section_headers" ADD CONSTRAINT "home_page_copy_section_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_copy_choose_features" ADD CONSTRAINT "home_page_copy_choose_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_copy_work_steps" ADD CONSTRAINT "home_page_copy_work_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_why_choose_features" ADD CONSTRAINT "home_page_why_choose_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_why_choose_stats" ADD CONSTRAINT "home_page_why_choose_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_why_choose_ratings" ADD CONSTRAINT "home_page_why_choose_ratings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_why_choose_ctas" ADD CONSTRAINT "home_page_why_choose_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_copy_section_headers_order_idx" ON "home_page_copy_section_headers" USING btree ("_order");
  CREATE INDEX "home_page_copy_section_headers_parent_id_idx" ON "home_page_copy_section_headers" USING btree ("_parent_id");
  CREATE INDEX "home_page_copy_choose_features_order_idx" ON "home_page_copy_choose_features" USING btree ("_order");
  CREATE INDEX "home_page_copy_choose_features_parent_id_idx" ON "home_page_copy_choose_features" USING btree ("_parent_id");
  CREATE INDEX "home_page_copy_work_steps_order_idx" ON "home_page_copy_work_steps" USING btree ("_order");
  CREATE INDEX "home_page_copy_work_steps_parent_id_idx" ON "home_page_copy_work_steps" USING btree ("_parent_id");
  CREATE INDEX "home_page_why_choose_features_order_idx" ON "home_page_why_choose_features" USING btree ("_order");
  CREATE INDEX "home_page_why_choose_features_parent_id_idx" ON "home_page_why_choose_features" USING btree ("_parent_id");
  CREATE INDEX "home_page_why_choose_stats_order_idx" ON "home_page_why_choose_stats" USING btree ("_order");
  CREATE INDEX "home_page_why_choose_stats_parent_id_idx" ON "home_page_why_choose_stats" USING btree ("_parent_id");
  CREATE INDEX "home_page_why_choose_ratings_order_idx" ON "home_page_why_choose_ratings" USING btree ("_order");
  CREATE INDEX "home_page_why_choose_ratings_parent_id_idx" ON "home_page_why_choose_ratings" USING btree ("_parent_id");
  CREATE INDEX "home_page_why_choose_ctas_order_idx" ON "home_page_why_choose_ctas" USING btree ("_order");
  CREATE INDEX "home_page_why_choose_ctas_parent_id_idx" ON "home_page_why_choose_ctas" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_copy_section_headers" CASCADE;
  DROP TABLE "home_page_copy_choose_features" CASCADE;
  DROP TABLE "home_page_copy_work_steps" CASCADE;
  DROP TABLE "home_page_why_choose_features" CASCADE;
  DROP TABLE "home_page_why_choose_stats" CASCADE;
  DROP TABLE "home_page_why_choose_ratings" CASCADE;
  DROP TABLE "home_page_why_choose_ctas" CASCADE;
  ALTER TABLE "site_settings" DROP COLUMN "topbar_working_hours";
  ALTER TABLE "home_page" DROP COLUMN "why_choose_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "why_choose_heading";
  ALTER TABLE "home_page" DROP COLUMN "why_choose_highlight";
  ALTER TABLE "home_page" DROP COLUMN "why_choose_intro";
  DROP TYPE "public"."enum_home_page_copy_section_headers_key";
  DROP TYPE "public"."enum_home_page_why_choose_ratings_platform";
  DROP TYPE "public"."enum_home_page_why_choose_ctas_platform";`)
}
