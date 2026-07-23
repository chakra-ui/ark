import { getDoc } from '~/lib/docs'

type Params = Promise<{ slug: string[] }>

export const GET = async (_request: Request, segmentData: { params: Params }) => {
  const { slug } = await segmentData.params
  const doc = getDoc(slug.join('/'))

  if (!doc) {
    return Response.json({ error: `Documentation page not found: ${slug.join('/')}` }, { status: 404 })
  }

  return Response.json(doc, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
