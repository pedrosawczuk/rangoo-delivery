CREATE TYPE "public"."billing_cycle" AS ENUM('MONTHLY', 'YEARLY');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('OWNER', 'MANAGER', 'DELIVERY_DRIVER', 'STAFF');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ACTIVE', 'CANCELED', 'PAST_DUE', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "public"."address_type_enum" AS ENUM('WORK', 'HOME');--> statement-breakpoint
CREATE TABLE "plans" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"price_in_cents" integer NOT NULL,
	"billing_cycle" "billing_cycle" NOT NULL,
	"active" boolean NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_categories" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "product_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"is_vegetarian" boolean DEFAULT false NOT NULL,
	"restaurant_id" uuid NOT NULL,
	"price_in_cents" integer NOT NULL,
	"discount_price_in_cents" integer,
	"category_id" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "restaurants" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"document" varchar(50) NOT NULL,
	"owner_id" uuid NOT NULL,
	"street" varchar(255) NOT NULL,
	"street_number" varchar(50) NOT NULL,
	"complement" varchar(255),
	"neighborhood" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(50) NOT NULL,
	"zip_code" varchar(20) NOT NULL,
	"category_id" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "restaurants_phone_unique" UNIQUE("phone"),
	CONSTRAINT "restaurants_document_unique" UNIQUE("document")
);
--> statement-breakpoint
CREATE TABLE "restaurant_categories" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "restaurant_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "restaurant_members" (
	"id" uuid PRIMARY KEY NOT NULL,
	"restaurant_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "role" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_subscriptions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"plan_id" uuid NOT NULL,
	"status" "status" NOT NULL,
	"current_period_start" timestamp NOT NULL,
	"current_period_end" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"document" varchar NOT NULL,
	"password_hash" text NOT NULL,
	"email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_phone_unique" UNIQUE("phone"),
	CONSTRAINT "users_document_unique" UNIQUE("document"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users_address" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"street" varchar(255) NOT NULL,
	"street_number" varchar(50) NOT NULL,
	"complement" varchar(255),
	"neighborhood" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(50) NOT NULL,
	"zip_code" varchar(20) NOT NULL,
	"is_default" boolean NOT NULL,
	"type" "address_type_enum",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_category_id_restaurant_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."restaurant_categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_members" ADD CONSTRAINT "restaurant_members_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_members" ADD CONSTRAINT "restaurant_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_address" ADD CONSTRAINT "users_address_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;