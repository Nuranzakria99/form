CREATE TABLE IF NOT EXISTS "psi_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"test_id" uuid,
	"question_id" uuid,
	"B" integer NOT NULL,
	"C" integer NOT NULL,
	"I" integer NOT NULL,
	"A" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "psi_report" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"test_id" uuid,
	"B" integer NOT NULL,
	"C" integer NOT NULL,
	"I" integer NOT NULL,
	"A" integer NOT NULL,
	"result" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "psi_test" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "psi_answers" ADD CONSTRAINT "psi_answers_test_id_riasec_test_id_fk" FOREIGN KEY ("test_id") REFERENCES "riasec_test"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "psi_answers" ADD CONSTRAINT "psi_answers_question_id_riasec_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "riasec_questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "psi_report" ADD CONSTRAINT "psi_report_test_id_riasec_test_id_fk" FOREIGN KEY ("test_id") REFERENCES "riasec_test"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "psi_test" ADD CONSTRAINT "psi_test_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
