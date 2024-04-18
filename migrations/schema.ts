import { pgTable, pgEnum, uuid, timestamp, unique, text, foreignKey, integer, jsonb, boolean, bigint } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])
export const pricingType = pgEnum("pricing_type", ['recurring', 'one_time'])
export const pricingPlanInterval = pgEnum("pricing_plan_interval", ['year', 'month', 'week', 'day'])
export const subscriptionStatus = pgEnum("subscription_status", ['unpaid', 'past_due', 'incomplete_expired', 'incomplete', 'canceled', 'active', 'trialing'])


export const studentDashboard = pgTable("student_dashboard", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	studentId: uuid("student_id").notNull(),
});

export const students = pgTable("students", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	phone: text("phone"),
},
(table) => {
	return {
		studentsEmailUnique: unique("students_email_unique").on(table.email),
	}
});

export const assessments = pgTable("assessments", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	riasecReportId: uuid("riasec_report_id").references(() => riasecReport.id),
	riasecTestId: uuid("riasec_test_id").references(() => riasecTest.id),
	userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
});

export const riasecReport = pgTable("riasec_report", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	testId: uuid("test_id").references(() => riasecTest.id, { onDelete: "cascade" } ),
	r: integer("r").notNull(),
	i: integer("i").notNull(),
	a: integer("a").notNull(),
	s: integer("s").notNull(),
	e: integer("e").notNull(),
	c: integer("c").notNull(),
	result: text("result").notNull(),
});

export const riasecTest = pgTable("riasec_test", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	studentId: uuid("student_id").references(() => students.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const riasecAnswers = pgTable("riasec_answers", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	testId: uuid("test_id").references(() => riasecTest.id, { onDelete: "cascade" } ),
	questionId: uuid("question_id").references(() => riasecQuestions.id, { onDelete: "cascade" } ),
	answer: text("answer").notNull(),
});

export const riasecQuestions = pgTable("riasec_questions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	question: text("question").notNull(),
	questionAr: text("question_ar").notNull(),
	type: text("type").notNull(),
});

export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull(),
	fullName: text("full_name"),
	avatarUrl: text("avatar_url"),
	email: text("email"),
	phone: text("phone"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	billingAddress: jsonb("billing_address"),
	paymentMethod: jsonb("payment_method"),
},
(table) => {
	return {
		usersIdFkey: foreignKey({
			columns: [table.id],
			foreignColumns: [table.id],
			name: "users_id_fkey"
		}),
		usersEmailKey: unique("users_email_key").on(table.email),
	}
});

export const customers = pgTable("customers", {
	id: uuid("id").primaryKey().notNull().references(() => users.id),
	stripeCustomerId: text("stripe_customer_id"),
});

export const products = pgTable("products", {
	id: text("id").primaryKey().notNull(),
	active: boolean("active"),
	name: text("name"),
	description: text("description"),
	image: text("image"),
	metadata: jsonb("metadata"),
});

export const prices = pgTable("prices", {
	id: text("id").primaryKey().notNull(),
	productId: text("product_id").references(() => products.id),
	active: boolean("active"),
	description: text("description"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	unitAmount: bigint("unit_amount", { mode: "number" }),
	currency: text("currency"),
	type: pricingType("type"),
	interval: pricingPlanInterval("interval"),
	intervalCount: integer("interval_count"),
	trialPeriodDays: integer("trial_period_days"),
	metadata: jsonb("metadata"),
});

export const subscriptions = pgTable("subscriptions", {
	id: text("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => users.id),
	status: subscriptionStatus("status"),
	metadata: jsonb("metadata"),
	priceId: text("price_id").references(() => prices.id),
	quantity: integer("quantity"),
	cancelAtPeriodEnd: boolean("cancel_at_period_end"),
	created: timestamp("created", { withTimezone: true, mode: 'string' }).default(sql`now()`).notNull(),
	currentPeriodStart: timestamp("current_period_start", { withTimezone: true, mode: 'string' }).default(sql`now()`).notNull(),
	currentPeriodEnd: timestamp("current_period_end", { withTimezone: true, mode: 'string' }).default(sql`now()`).notNull(),
	endedAt: timestamp("ended_at", { withTimezone: true, mode: 'string' }).default(sql`now()`),
	cancelAt: timestamp("cancel_at", { withTimezone: true, mode: 'string' }).default(sql`now()`),
	canceledAt: timestamp("canceled_at", { withTimezone: true, mode: 'string' }).default(sql`now()`),
	trialStart: timestamp("trial_start", { withTimezone: true, mode: 'string' }).default(sql`now()`),
	trialEnd: timestamp("trial_end", { withTimezone: true, mode: 'string' }).default(sql`now()`),
});

export const psiQuestions = pgTable("psi_questions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	behavioral: text("behavioral").notNull(),
	cognitive: text("cognitive").notNull(),
	interpersonal: text("interpersonal").notNull(),
	affective: text("affective").notNull(),
	behavioralAr: text("behavioral_ar").notNull(),
	cognitiveAr: text("cognitive_ar").notNull(),
	interpersonalAr: text("interpersonal_ar").notNull(),
	affectiveAr: text("affective_ar").notNull(),
});

export const psiAnswers = pgTable("psi_answers", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	testId: uuid("test_id").references(() => riasecTest.id, { onDelete: "cascade" } ),
	questionId: uuid("question_id").references(() => riasecQuestions.id, { onDelete: "cascade" } ),
	b: integer("B").notNull(),
	c: integer("C").notNull(),
	i: integer("I").notNull(),
	a: integer("A").notNull(),
});

export const psiReport = pgTable("psi_report", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	testId: uuid("test_id").references(() => riasecTest.id, { onDelete: "cascade" } ),
	b: integer("B").notNull(),
	c: integer("C").notNull(),
	i: integer("I").notNull(),
	a: integer("A").notNull(),
	result: text("result").notNull(),
});

export const psiTest = pgTable("psi_test", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	assessmentId: uuid("assessment_Id").references(() => assessments.id, { onDelete: "cascade" } ),
});