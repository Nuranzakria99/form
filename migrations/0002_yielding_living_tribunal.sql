ALTER TABLE "assessments" DROP CONSTRAINT "assessments_student_id_students_id_fk";
--> statement-breakpoint
ALTER TABLE "assessments" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assessments" ADD CONSTRAINT "assessments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "assessments" DROP COLUMN IF EXISTS "student_id";