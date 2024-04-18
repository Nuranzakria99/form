import { assessments, prices, products, psiAnswers, psiQuestions, psiReport, psiTest, riasecAnswers, riasecQuestions, riasecReport, riasecTest, studentDashboard, students, subscriptions, users } from "@/migrations/schema"
import { InferSelectModel } from "drizzle-orm"

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assessments: {
        Row: {
          created_at: string
          id: string
          riasec_report_id: string | null
          student_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          riasec_report_id?: string | null
          student_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          riasec_report_id?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessments_riasec_report_id_riasec_report_id_fk"
            columns: ["riasec_report_id"]
            isOneToOne: false
            referencedRelation: "riasec_report"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_student_id_students_id_fk"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      riasec_answers: {
        Row: {
          answer: string
          id: string
          question_id: string | null
          test_id: string | null
        }
        Insert: {
          answer: string
          id?: string
          question_id?: string | null
          test_id?: string | null
        }
        Update: {
          answer?: string
          id?: string
          question_id?: string | null
          test_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "riasec_answers_question_id_riasec_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "riasec_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "riasec_answers_test_id_riasec_test_id_fk"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "riasec_test"
            referencedColumns: ["id"]
          },
        ]
      }
      riasec_questions: {
        Row: {
          id: string
          question: string
          question_ar: string
          type: string
        }
        Insert: {
          id?: string
          question: string
          question_ar: string
          type: string
        }
        Update: {
          id?: string
          question?: string
          question_ar?: string
          type?: string
        }
        Relationships: []
      }
      riasec_report: {
        Row: {
          a: number
          c: number
          e: number
          i: number
          id: string
          r: number
          result: string
          s: number
          test_id: string | null
        }
        Insert: {
          a: number
          c: number
          e: number
          i: number
          id?: string
          r: number
          result: string
          s: number
          test_id?: string | null
        }
        Update: {
          a?: number
          c?: number
          e?: number
          i?: number
          id?: string
          r?: number
          result?: string
          s?: number
          test_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "riasec_report_test_id_riasec_test_id_fk"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "riasec_test"
            referencedColumns: ["id"]
          },
        ]
      }
      riasec_test: {
        Row: {
          created_at: string
          id: string
          student_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          student_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "riasec_test_student_id_students_id_fk"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_dashboard: {
        Row: {
          created_at: string
          id: string
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          student_id?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          email: string | null
          full_name: string | null
          id: string
          payment_method: Json | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          email?: string | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          email?: string | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type studentDashboard = InferSelectModel<typeof studentDashboard>;
export type User = InferSelectModel<typeof users>;
export type Student = InferSelectModel<typeof students>;
export type assessment = InferSelectModel<typeof assessments>;
export type riasecQuestion = InferSelectModel<typeof riasecQuestions>;
export type riasecTest = InferSelectModel<typeof riasecTest>;
export type riasecAnswer = InferSelectModel<typeof riasecAnswers>;
export type riasecReport = InferSelectModel<typeof riasecReport>;
export type Product = InferSelectModel<typeof products>;
export type Price = InferSelectModel<typeof prices> & {products?: Product};
export type subscription = InferSelectModel<typeof subscriptions> & {prices?: Price[];};
export type ProductWithPrice = Product & {price?: Price[]; };
export type PsiQuestions = InferSelectModel<typeof psiQuestions>;
export type PsiTest = InferSelectModel<typeof psiTest>;
export type PsiAnswer = InferSelectModel<typeof psiAnswers>;
export type PsiReport = InferSelectModel<typeof psiReport>;

