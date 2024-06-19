import type { NextRequest } from 'next/server'
import { types } from '.velite'

interface Params {
  framework: string
}

export const GET = async (_: NextRequest, { params }: { params: Params }) => {
  const { framework } = params
  const components = types.filter((type) => type.framework === framework).map((x) => x.component)

  if (!components) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  return Response.json(components)
}
