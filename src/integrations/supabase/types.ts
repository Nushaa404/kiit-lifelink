export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          created_at: string | null
          date: string
          faculty_id: string | null
          id: string
          status: string
          student_id: string | null
          subject: string
        }
        Insert: {
          created_at?: string | null
          date: string
          faculty_id?: string | null
          id?: string
          status: string
          student_id?: string | null
          subject: string
        }
        Update: {
          created_at?: string | null
          date?: string
          faculty_id?: string | null
          id?: string
          status?: string
          student_id?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      club_profiles: {
        Row: {
          club_name: string
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          social_links: Json | null
        }
        Insert: {
          club_name: string
          created_at?: string | null
          description?: string | null
          id: string
          logo_url?: string | null
          social_links?: Json | null
        }
        Update: {
          club_name?: string
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          social_links?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "club_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          description: string | null
          end_time: string
          event_type: Database["public"]["Enums"]["event_type"]
          id: string
          location: string | null
          organizer_id: string | null
          poster_url: string | null
          registration_link: string | null
          start_time: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_time: string
          event_type: Database["public"]["Enums"]["event_type"]
          id?: string
          location?: string | null
          organizer_id?: string | null
          poster_url?: string | null
          registration_link?: string | null
          start_time: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_time?: string
          event_type?: Database["public"]["Enums"]["event_type"]
          id?: string
          location?: string | null
          organizer_id?: string | null
          poster_url?: string | null
          registration_link?: string | null
          start_time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      faculty_profiles: {
        Row: {
          created_at: string | null
          department: string
          designation: string | null
          id: string
          subjects: string[] | null
        }
        Insert: {
          created_at?: string | null
          department: string
          designation?: string | null
          id: string
          subjects?: string[] | null
        }
        Update: {
          created_at?: string | null
          department?: string
          designation?: string | null
          id?: string
          subjects?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "faculty_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_channels: {
        Row: {
          channel_type: string
          created_at: string | null
          description: string | null
          faculty_id: string | null
          id: string
          name: string
        }
        Insert: {
          channel_type: string
          created_at?: string | null
          description?: string | null
          faculty_id?: string | null
          id?: string
          name: string
        }
        Update: {
          channel_type?: string
          created_at?: string | null
          description?: string | null
          faculty_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_channels_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          attachments: Json | null
          author_id: string | null
          channel_id: string | null
          content: string
          created_at: string | null
          id: string
        }
        Insert: {
          attachments?: Json | null
          author_id?: string | null
          channel_id?: string | null
          content: string
          created_at?: string | null
          id?: string
        }
        Update: {
          attachments?: Json | null
          author_id?: string | null
          channel_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_posts_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "forum_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      notices: {
        Row: {
          author_id: string | null
          category: Database["public"]["Enums"]["notice_category"]
          content: string
          created_at: string | null
          department: string | null
          id: string
          is_urgent: boolean | null
          title: string
        }
        Insert: {
          author_id?: string | null
          category: Database["public"]["Enums"]["notice_category"]
          content: string
          created_at?: string | null
          department?: string | null
          id?: string
          is_urgent?: boolean | null
          title: string
        }
        Update: {
          author_id?: string | null
          category?: Database["public"]["Enums"]["notice_category"]
          content?: string
          created_at?: string | null
          department?: string | null
          id?: string
          is_urgent?: boolean | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "notices_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      student_profiles: {
        Row: {
          branch: string
          created_at: string | null
          id: string
          interests: string[] | null
          roll_number: string | null
          semester: number
          tokens: number | null
        }
        Insert: {
          branch: string
          created_at?: string | null
          id: string
          interests?: string[] | null
          roll_number?: string | null
          semester: number
          tokens?: number | null
        }
        Update: {
          branch?: string
          created_at?: string | null
          id?: string
          interests?: string[] | null
          roll_number?: string | null
          semester?: number
          tokens?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      timetables: {
        Row: {
          branch: string
          created_at: string | null
          day_of_week: number
          end_time: string
          faculty_id: string | null
          id: string
          room_location: string | null
          semester: number
          start_time: string
          subject: string
        }
        Insert: {
          branch: string
          created_at?: string | null
          day_of_week: number
          end_time: string
          faculty_id?: string | null
          id?: string
          room_location?: string | null
          semester: number
          start_time: string
          subject: string
        }
        Update: {
          branch?: string
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          faculty_id?: string | null
          id?: string
          room_location?: string | null
          semester?: number
          start_time?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "timetables_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      token_transactions: {
        Row: {
          amount: number
          approved_by: string | null
          certificate_url: string | null
          created_at: string | null
          id: string
          reason: string
          status: string | null
          student_id: string | null
        }
        Insert: {
          amount: number
          approved_by?: string | null
          certificate_url?: string | null
          created_at?: string | null
          id?: string
          reason: string
          status?: string | null
          student_id?: string | null
        }
        Update: {
          amount?: number
          approved_by?: string | null
          certificate_url?: string | null
          created_at?: string | null
          id?: string
          reason?: string
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "token_transactions_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "token_transactions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
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
      event_type:
        | "academic"
        | "festival"
        | "club"
        | "recruitment"
        | "workshop"
        | "seminar"
      notice_category: "academic" | "event" | "club" | "urgent" | "general"
      user_role: "student" | "faculty" | "club"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_type: [
        "academic",
        "festival",
        "club",
        "recruitment",
        "workshop",
        "seminar",
      ],
      notice_category: ["academic", "event", "club", "urgent", "general"],
      user_role: ["student", "faculty", "club"],
    },
  },
} as const
