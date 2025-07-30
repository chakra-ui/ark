import { z } from 'zod'
import { fetchComponentList, getExample } from '../lib/fetch.js'
import { FRAMEWORKS, type Tool } from '../lib/types.js'

export const getExampleTool: Tool<{ componentList: string[] }> = {
  name: 'get_example',
  description: 'Retrieve a specific example from Ark UI based on the framework and component type.',
  ctx: async () => {
    const componentList = await fetchComponentList('react') // Default to 'react' for initial context
    return { componentList }
  },
  async exec(server, { ctx, name, description }) {
    server.tool(
      name,
      description,
      {
        exampleId: z
          .string()
          .describe(
            'The ID of the example of the component to retrieve. This can be derived from call the list_examples tool.',
          ),
        framework: z.enum(FRAMEWORKS).describe('The framework type.'),
        component: z
          .enum(ctx.componentList as [string, ...string[]])
          .describe('The name of the component to retrieve the example for.'),
      },
      async ({ framework, component, exampleId }) => {
        const example = await getExample({ framework, component, exampleId })

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(example, null, 2),
            },
          ],
        }
      },
    )
  },
}
