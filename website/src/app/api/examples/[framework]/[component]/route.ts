import type { NextRequest } from 'next/server'
import {
  SUPPORTED_FRAMEWORKS,
  getComponentExamples,
  getExamplePath,
  getFrameworkExtension,
  getSrcPath,
  validateFramework,
} from '~/lib/example-utils'

type Params = Promise<{ framework: string; component: string }>

export const GET = async (_: NextRequest, segmentData: { params: Params }) => {
  try {
    const { framework, component } = await segmentData.params

    // Validate framework
    if (!validateFramework(framework)) {
      return Response.json(
        { error: `Unsupported framework: ${framework}. Supported frameworks: ${SUPPORTED_FRAMEWORKS.join(', ')}` },
        { status: 400 },
      )
    }

    const exampleIds = await getComponentExamples(framework, component)
    const examplePath = getExamplePath(component)
    const srcPath = getSrcPath(framework)
    const extension = getFrameworkExtension(framework)

    const examples = exampleIds.map((id) => ({
      id,
      filename: `${id}.${extension}`,
      url: `/api/examples/${framework}/${component}/${id}`,
    }))

    return Response.json({
      framework,
      component,
      examples,
      count: examples.length,
      path: `packages/${framework}/${srcPath}/${examplePath}`,
    })
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return Response.json({ error: 'Component examples directory not found' }, { status: 404 })
    }

    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
