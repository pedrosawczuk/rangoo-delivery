ALTER TABLE "restaurants" ADD COLUMN "document" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_document_unique" UNIQUE("document");