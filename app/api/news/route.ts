import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "../../../lib/supabaseServer"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '6')
    const published = searchParams.get('published') !== 'false'

    const sb = supabaseAdmin()
    
    let query = sb
      .from("news")
      .select("id, title, content, excerpt, published_at, created_at")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(limit)

    if (published) {
      query = query.eq("published", true)
    }

    const { data: news, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json(news || [])
  } catch (error: any) {
    console.error("News fetch error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch news" },
      { status: 500 }
    )
  }
}

// For creating news (admin only - you can add auth later)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const sb = supabaseAdmin()

    const { data: news, error } = await sb
      .from("news")
      .insert({
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        published: body.published || false,
        published_at: body.published ? new Date().toISOString() : null,
      })
      .select("*")
      .maybeSingle()

    if (error) {
      throw error
    }

    return NextResponse.json(news, { status: 201 })
  } catch (error: any) {
    console.error("News creation error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create news" },
      { status: 500 }
    )
  }
}
