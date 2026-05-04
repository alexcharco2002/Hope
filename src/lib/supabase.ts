import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type Comentario = {
  id: string // Cambiado de number a string para soportar UUID
  nombre: string
  mensaje: string
  created_at: string
}