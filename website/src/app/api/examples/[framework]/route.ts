import type { NextRequest } from 'next/server'
import { SUPPORTED_FRAMEWORKS, getAllComponents, getComponentExamples, validateFramework } from '~/lib/example-utils'

type Params = Promise<{ framework: string }>

export const GET = async (_: NextRequest, segmentData: { params: Params }) => {
  try {
    const { framework } = await segmentData.params

    // Validate framework
    if (!validateFramework(framework)) {
      return Response.json(
        { error: `Unsupported framework: ${framework}. Supported frameworks: ${SUPPORTED_FRAMEWORKS.join(', ')}` },
        { status: 400 },
      )
    }

    const components = await getAllComponents(framework)

    const examples = await Promise.all(
      components.map(async (component) => {
        const exampleIds = await getComponentExamples(framework, component)
        return {
          component,
          examples: exampleIds.map((id) => ({
            id,
            path: `/api/examples/${framework}/${component}/${id}`,
          })),
        }
      }),
    )

    return Response.json({
      framework,
      components: examples.filter((c) => c.examples.length > 0),
    })
  } catch (error) {
    console.error('Error fetching examples:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
