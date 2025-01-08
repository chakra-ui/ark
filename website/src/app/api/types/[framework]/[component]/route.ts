import { types } from '.velite'
import type { NextRequest } from 'next/server'

type Params = Promise<{ framework: string; component: string }>

export const GET = async (_: NextRequest, segmentData: { params: Params }) => {
  const { framework, component } = await segmentData.params
  const api = types.find((type) => type.component === component && type.framework === framework)

  if (!api) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  return Response.json(api.parts)
}
