CREATE TABLE "restaurants" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"owner_id" uuid NOT NULL,
	"street" varchar(255) NOT NULL,
	"street_number" varchar(50) NOT NULL,
	"complement" varchar(255),
	"neighborhood" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(50) NOT NULL,
	"zip_code" varchar(20) NOT NULL,
	CONSTRAINT "restaurants_phone_unique" UNIQUE("phone")
);
