ALTER TABLE "restaurants" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "restaurants" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;