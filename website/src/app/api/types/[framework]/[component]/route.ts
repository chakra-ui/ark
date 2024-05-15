import type { NextRequest } from 'next/server'
import { types } from '.velite'

interface Params {
  framework: string
  component: string
}

export const GET = async (_: NextRequest, { params }: { params: Params }) => {
  const { component, framework } = params
  const api = types.find((type) => type.component === component && type.framework === framework)

  if (!api) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  return Response.json(api.parts)
}
