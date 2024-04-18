import { prices, subscriptionStatus, users } from "@/migrations/schema";
import { pgTable, uuid, timestamp, text, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";


export const studentDashboard = pgTable('student_dashboard',{
    id:uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    studentId: uuid('student_id').notNull(),
});

export const students = pgTable('students', {
    id:uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    phone: text('phone'),
});

export const assessments = pgTable('assessments', {
    id:uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    userId: uuid('user_id').references(() => users.id, {onDelete: 'cascade'}).notNull(),
    riasecReportId: uuid('riasec_report_id').references(() => riasecReport.id),
    riasecTestId: uuid('riasec_test_id').references(() => riasecTest.id)
});

export const riasecQuestions = pgTable('riasec_questions', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    question: text('question').notNull(),
    questionAr: text('question_ar').notNull(),
    type: text('type').notNull(),
});
export const riasecTest = pgTable('riasec_test', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    studentId:  uuid('student_id').references(() => students.id, {onDelete: 'cascade'}),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
});
export const riasecAnswers = pgTable('riasec_answers', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    testId: uuid('test_id').references(() => riasecTest.id, {onDelete: 'cascade'}),
    questionId: uuid('question_id').references(() => riasecQuestions.id, {onDelete: 'cascade'}),
    answer: text('answer').notNull(),
});
export const riasecReport = pgTable('riasec_report', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    testId: uuid('test_id').references(() => riasecTest.id, {onDelete: 'cascade'}),
    R: integer('r').notNull(),
    I: integer('i').notNull(),
    A: integer('a').notNull(),
    S: integer('s').notNull(),
    E: integer('e').notNull(),
    C: integer('c').notNull(),
    result: text('result').notNull(),
});

export const psiQuestions = pgTable('psi_questions', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    behavioral: text('behavioral').notNull(),
    cognitive: text('cognitive').notNull(),
    interpersonal: text('interpersonal').notNull(),
    affective: text('affective').notNull(),
    behavioral_ar: text('behavioral_ar').notNull(),
    cognitive_ar: text('cognitive_ar').notNull(),
    interpersonal_ar: text('interpersonal_ar').notNull(),
    affective_ar: text('affective_ar').notNull(),
});
export const psiTest = pgTable('psi_test', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    assessmentId:  uuid('assessment_Id').references(() => assessments.id, {onDelete: 'cascade'}),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
});
export const psiAnswers = pgTable('psi_answers', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    testId: uuid('test_id').references(() => riasecTest.id, {onDelete: 'cascade'}),
    questionId: uuid('question_id').references(() => riasecQuestions.id, {onDelete: 'cascade'}),
    B: integer('B').notNull(),
    C: integer('C').notNull(),
    I: integer('I').notNull(),
    A: integer('A').notNull(),
});
export const psiReport = pgTable('psi_report', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    testId: uuid('test_id').references(() => riasecTest.id, {onDelete: 'cascade'}),
    B: integer('B').notNull(),
    C: integer('C').notNull(),
    I: integer('I').notNull(),
    A: integer('A').notNull(),
    result: text('result').notNull(),
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

