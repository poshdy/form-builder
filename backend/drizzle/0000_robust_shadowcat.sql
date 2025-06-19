CREATE TABLE "accounts" (
	"account_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"email" varchar NOT NULL,
	"password" text,
	"refresh_token" text,
	"provider" text DEFAULT 'credentials' NOT NULL,
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3) DEFAULT now(),
	"deleted_at" timestamp (3),
	CONSTRAINT "accounts_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "form" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" varchar,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"published_at" timestamp,
	"fields" json,
	"submissions" integer DEFAULT 0,
	"visits" integer DEFAULT 0,
	"share_url" varchar DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3) DEFAULT now(),
	"deleted_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "form_submission" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"form_id" varchar NOT NULL,
	"email" varchar,
	"name" varchar,
	"submitted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now()
);
