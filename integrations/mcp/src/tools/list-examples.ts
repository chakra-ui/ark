import { z } from 'zod'
import { fetchComponentList, listComponentExamples } from '../lib/fetch.js'
import { FRAMEWORKS, type Tool } from '../lib/types.js'

export const listExamplesTool: Tool<{ componentList: string[] }> = {
  name: 'list_examples',
  description: 'List all examples for a specific component in Ark UI.',
  ctx: async () => {
    const componentList = await fetchComponentList('react') // Default to 'react' for initial context
    return { componentList }
  },
  async exec(server, { ctx, name, description }) {
    server.tool(
      name,
      description,
      {
        framework: z.enum(FRAMEWORKS).describe('The framework type to list components for.'),
        component: z
          .enum(ctx.componentList as [string, ...string[]])
          .describe('The name of the component to retrieve the example for.'),
      },
      async ({ framework, component }) => {
        const examples = await listComponentExamples({ framework, component })

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(examples, null, 2),
            },
          ],
        }
      },
    )
  },
}
