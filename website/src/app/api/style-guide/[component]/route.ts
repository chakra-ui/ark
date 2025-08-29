import { getCssVarDoc, getDataAttrDoc, type CssVarDocKey, type DataAttrDocKey } from '@zag-js/docs'
import { Effect, pipe } from 'effect'
import type { NextRequest } from 'next/server'

type Params = Promise<{ component: string }>

export const GET = async (_: NextRequest, segmentData: { params: Params }) => {
  const { component } = await segmentData.params

  if (!component) {
    return Response.json({ error: 'Component parameter is required' }, { status: 400 })
  }

  const program = pipe(
    Effect.all({
      dataAttr: Effect.try(() => getDataAttrDoc(component as DataAttrDocKey)),
      cssVar: Effect.try(() => getCssVarDoc(component as CssVarDocKey)).pipe(Effect.orElseSucceed(() => ({}))),
    }),
    Effect.map((result) => Response.json(result)),
    Effect.orElse(() =>
      Effect.succeed(Response.json({ error: 'Component not found in documentation' }, { status: 404 })),
    ),
  )

  return Effect.runPromise(program)
}
