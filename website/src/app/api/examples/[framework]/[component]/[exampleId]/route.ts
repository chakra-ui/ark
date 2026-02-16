import type { NextRequest } from 'next/server'
import {
  SUPPORTED_FRAMEWORKS,
  cleanCode,
  createExampleResponse,
  readExampleFile,
  validateFramework,
} from '~/lib/example-utils'

type Params = Promise<{ framework: string; component: string; exampleId: string }>

export const GET = async (_: NextRequest, segmentData: { params: Params }) => {
  try {
    const { framework, component, exampleId } = await segmentData.params

    // Validate framework
    if (!validateFramework(framework)) {
      return Response.json(
        { error: `Unsupported framework: ${framework}. Supported frameworks: ${SUPPORTED_FRAMEWORKS.join(', ')}` },
        { status: 400 },
      )
    }

    const content = await readExampleFile(framework, component, exampleId)
    const code = cleanCode(content)
    const response = await createExampleResponse(exampleId, framework, component, code)

    return Response.json(response)
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return Response.json({ error: 'Example not found' }, { status: 404 })
    }

    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
