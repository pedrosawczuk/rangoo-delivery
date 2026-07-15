ALTER TABLE "restaurant_members" DROP CONSTRAINT "restaurant_members_restaurant_id_restaurants_id_fk";
--> statement-breakpoint
ALTER TABLE "restaurant_members" DROP CONSTRAINT "restaurant_members_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_subscriptions" DROP CONSTRAINT "user_subscriptions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_subscriptions" DROP CONSTRAINT "user_subscriptions_plan_id_plans_id_fk";
--> statement-breakpoint
ALTER TABLE "restaurant_members" ADD CONSTRAINT "restaurant_members_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_members" ADD CONSTRAINT "restaurant_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;