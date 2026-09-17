import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { OgTemplate, ogSize } from '~/lib/og-template'

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Ark UI'
  const description = searchParams.get('description') ?? undefined
  const category = searchParams.get('category') ?? undefined

  return new ImageResponse(<OgTemplate title={title} description={description} category={category} />, ogSize)
}
