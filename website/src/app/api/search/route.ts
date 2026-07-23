import { data } from '~/lib/search'
import { querySearch } from '~/lib/search-query'

const indexHeaders = {
  'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
}

const queryHeaders = {
  'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
}

export const GET = (request: Request) => {
  const query = new URL(request.url).searchParams.get('q')

  if (query === null) {
    return Response.json(data, { headers: indexHeaders })
  }

  const groups = querySearch(data, query)
  const items = Object.values(groups).flat()

  return Response.json(
    {
      query: query.trim(),
      groups,
      items,
    },
    { headers: queryHeaders },
  )
}
