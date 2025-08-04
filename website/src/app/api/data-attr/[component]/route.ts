import { type DataAttrDocKey, getDataAttrDoc } from '@zag-js/docs'
import type { NextRequest } from 'next/server'

type Params = Promise<{ component: string }>

export const GET = async (_: NextRequest, segmentData: { params: Params }) => {
  const { component } = await segmentData.params

  if (!component) {
    return Response.json({ error: 'Component parameter is required' }, { status: 400 })
  }

  const dataAttrDoc = getDataAttrDoc(component as DataAttrDocKey)

  if (!dataAttrDoc) {
    return Response.json({ error: 'Component not found in documentation' }, { status: 404 })
  }

  return Response.json(dataAttrDoc)
}
