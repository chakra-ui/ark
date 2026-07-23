import { listDocs, searchDocs } from '~/lib/docs'

const headers = {
  'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
}

export const GET = (request: Request) => {
  const query = new URL(request.url).searchParams.get('q')

  if (query === null) {
    return Response.json({ docs: listDocs() }, { headers })
  }

  return Response.json(
    {
      query: query.trim(),
      results: searchDocs(query),
    },
    { headers },
  )
}
