import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { avatarUrl } from '~/lib/authors'
import { OgTemplate, ogSize } from '~/lib/og-template'

const GITHUB_LOGIN = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Ark UI'
  const description = searchParams.get('description') ?? undefined
  const category = searchParams.get('category') ?? undefined
  const author = searchParams.get('author') ?? undefined
  const authorLogin = searchParams.get('authorLogin') ?? undefined
  const authorImage = authorLogin && GITHUB_LOGIN.test(authorLogin) ? avatarUrl(authorLogin, 96) : undefined

  return new ImageResponse(
    <OgTemplate
      title={title}
      description={description}
      category={category}
      author={author}
      authorImage={authorImage}
    />,
    ogSize,
  )
}
