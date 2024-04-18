ALTER TABLE "psi_test" DROP CONSTRAINT "psi_test_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "psi_test" ADD COLUMN "assessment_Id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "psi_test" ADD CONSTRAINT "psi_test_assessment_Id_assessments_id_fk" FOREIGN KEY ("assessment_Id") REFERENCES "assessments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "psi_test" DROP COLUMN IF EXISTS "user_id";