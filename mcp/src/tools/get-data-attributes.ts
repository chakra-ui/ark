import { z } from 'zod'
import { fetchComponentList, getComponentDataAttributes } from '../lib/fetch.js'
import type { Tool } from '../lib/types.js'

export const stylingGuideTool: Tool<{ componentList: string[] }> = {
  name: 'styling_guide',
  description:
    'This tool retrieves the data attributes for a specific component in Ark UI, which can be used for styling and customization.',
  ctx: async () => {
    const componentList = await fetchComponentList('react') // Default to 'react' for initial context
    return { componentList }
  },
  async exec(server, { ctx, name, description }) {
    server.tool(
      name,
      description,
      {
        component: z
          .enum(ctx.componentList as [string, ...string[]])
          .describe('The name of the component to retrieve data attributes for.'),
      },
      async ({ component }) => {
        const attributes = await getComponentDataAttributes(component)

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(attributes, null, 2),
            },
          ],
        }
      },
    )
  },
}
