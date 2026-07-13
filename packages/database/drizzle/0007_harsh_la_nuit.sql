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
