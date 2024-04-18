CREATE TABLE IF NOT EXISTS "psi_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"behavioral" text NOT NULL,
	"cognitive" text NOT NULL,
	"interpersonal" text NOT NULL,
	"affective" text NOT NULL,
	"behavioral_ar" text NOT NULL,
	"cognitive_ar" text NOT NULL,
	"interpersonal_ar" text NOT NULL,
	"affective_ar" text NOT NULL
);
