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
      group_relationships: {
        Row: {
          created_at: string
          id: number
          predecessor_group_title: string
          successor_group_title: string
        }
        Insert: {
          created_at?: string
          id?: number
          predecessor_group_title: string
          successor_group_title: string
        }
        Update: {
          created_at?: string
          id?: number
          predecessor_group_title?: string
          successor_group_title?: string
        }
        Relationships: []
      }
      item_relationships: {
        Row: {
          created_at: string
          id: number
          predecessor_item_id: number
          successor_item_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          predecessor_item_id: number
          successor_item_id: number
        }
        Update: {
          created_at?: string
          id?: number
          predecessor_item_id?: number
          successor_item_id?: number
        }
        Relationships: []
      }
      log_comments: {
        Row: {
          content: string
          created_at: string
          id: number
          log_id: number
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          log_id: number
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          log_id?: number
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      schedule_files: {
        Row: {
          content_type: string | null
          created_at: string
          file_path: string
          filename: string
          id: number
          item_id: number | null
          size: number | null
          sub_item_id: number | null
        }
        Insert: {
          content_type?: string | null
          created_at?: string
          file_path: string
          filename: string
          id?: number
          item_id?: number | null
          size?: number | null
          sub_item_id?: number | null
        }
        Update: {
          content_type?: string | null
          created_at?: string
          file_path?: string
          filename?: string
          id?: number
          item_id?: number | null
          size?: number | null
          sub_item_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "schedule_files_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "template_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_files_sub_item_id_fkey"
            columns: ["sub_item_id"]
            isOneToOne: false
            referencedRelation: "template_sub_items"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_templates: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      template_groups: {
        Row: {
          created_at: string
          id: number
          sort_order: number
          template_id: number | null
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          sort_order: number
          template_id?: number | null
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          sort_order?: number
          template_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_groups_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "schedule_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_items: {
        Row: {
          contractor: string | null
          created_at: string
          duration: number | null
          group_id: number | null
          id: number
          sort_order: number
          status: string
          title: string
        }
        Insert: {
          contractor?: string | null
          created_at?: string
          duration?: number | null
          group_id?: number | null
          id?: number
          sort_order: number
          status: string
          title: string
        }
        Update: {
          contractor?: string | null
          created_at?: string
          duration?: number | null
          group_id?: number | null
          id?: number
          sort_order?: number
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_items_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "template_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      template_sub_items: {
        Row: {
          completed: boolean | null
          contractor: string | null
          created_at: string
          duration: number | null
          id: number
          item_id: number | null
          status: string
          title: string
        }
        Insert: {
          completed?: boolean | null
          contractor?: string | null
          created_at?: string
          duration?: number | null
          id?: number
          item_id?: number | null
          status: string
          title: string
        }
        Update: {
          completed?: boolean | null
          contractor?: string | null
          created_at?: string
          duration?: number | null
          id?: number
          item_id?: number | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_sub_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "template_items"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
