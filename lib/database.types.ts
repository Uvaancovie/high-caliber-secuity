// Database types for Supabase schema
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          company: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          company?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          company?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      guard_levels: {
        Row: {
          id: number
          name: string
          description: string | null
          hourly_rate_cents: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          hourly_rate_cents: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          hourly_rate_cents?: number
          created_at?: string
          updated_at?: string
        }
      }
      areas: {
        Row: {
          id: number
          city: string
          area: string | null
          risk_multiplier: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          city: string
          area?: string | null
          risk_multiplier?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          city?: string
          area?: string | null
          risk_multiplier?: number
          created_at?: string
          updated_at?: string
        }
      }
      quotes: {
        Row: {
          id: string
          user_id: string | null
          kind: 'personal' | 'business'
          payload: any
          breakdown: any
          total_cents: number
          currency: string
          status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
          expires_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          kind: 'personal' | 'business'
          payload: any
          breakdown: any
          total_cents: number
          currency?: string
          status?: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
          expires_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          kind?: 'personal' | 'business'
          payload?: any
          breakdown?: any
          total_cents?: number
          currency?: string
          status?: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
          expires_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          author_id: string | null
          published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          author_id?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          author_id?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          subject: string | null
          message: string
          status: 'new' | 'in_progress' | 'resolved' | 'closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          subject?: string | null
          message: string
          status?: 'new' | 'in_progress' | 'resolved' | 'closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          subject?: string | null
          message?: string
          status?: 'new' | 'in_progress' | 'resolved' | 'closed'
          created_at?: string
          updated_at?: string
        }
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
