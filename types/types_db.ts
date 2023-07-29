export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      certifications: {
        Row: {
          certificate_path: string | null
          created_at: string | null
          description: string | null
          id: number
          title: string | null
          user_id: string | null
          year: number | null
        }
        Insert: {
          certificate_path?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          title?: string | null
          user_id?: string | null
          year?: number | null
        }
        Update: {
          certificate_path?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          title?: string | null
          user_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "certifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      journals: {
        Row: {
          authors: string | null
          created_at: string | null
          description: string | null
          id: number
          journal_path: string | null
          title: string | null
          url: string | null
          user_id: string | null
          year: number | null
        }
        Insert: {
          authors?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          journal_path?: string | null
          title?: string | null
          url?: string | null
          user_id?: string | null
          year?: number | null
        }
        Update: {
          authors?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          journal_path?: string | null
          title?: string | null
          url?: string | null
          user_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "journals_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          aadhaar: number | null
          address: string | null
          admin: boolean | null
          avatar_url: string | null
          community: string | null
          dob: string | null
          experience: number | null
          full_name: string | null
          id: string
          joining_date: string | null
          mobile: number | null
          pan: string | null
          religion: string | null
          sex: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          aadhaar?: number | null
          address?: string | null
          admin?: boolean | null
          avatar_url?: string | null
          community?: string | null
          dob?: string | null
          experience?: number | null
          full_name?: string | null
          id: string
          joining_date?: string | null
          mobile?: number | null
          pan?: string | null
          religion?: string | null
          sex?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          aadhaar?: number | null
          address?: string | null
          admin?: boolean | null
          avatar_url?: string | null
          community?: string | null
          dob?: string | null
          experience?: number | null
          full_name?: string | null
          id?: string
          joining_date?: string | null
          mobile?: number | null
          pan?: string | null
          religion?: string | null
          sex?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      qualifications: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          qualification_path: string | null
          subject: string | null
          title: string | null
          user_id: string | null
          year: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          qualification_path?: string | null
          subject?: string | null
          title?: string | null
          user_id?: string | null
          year?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          qualification_path?: string | null
          subject?: string | null
          title?: string | null
          user_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "qualifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
