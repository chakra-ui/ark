import { z } from 'zod'
import { fetchComponentList, getComponentProps } from '../lib/fetch.js'
import { FRAMEWORKS, type Tool } from '../lib/types.js'

export const getComponentPropsTool: Tool<{ componentList: string[] }> = {
  name: 'get_component_props',
  description:
    'Get the props/properties for a specific Ark UI component in a given framework. This tool retrieves detailed information about the available props for the specified component.',
  ctx: async () => {
    const componentList = await fetchComponentList('react') // Default to 'react' for initial context
    return { componentList }
  },
  async exec(server, { name, description, ctx }) {
    server.tool(
      name,
      description,
      {
        framework: z.enum(FRAMEWORKS).describe('The framework type to get component props for.'),
        component: z
          .enum(ctx.componentList as [string, ...string[]])
          .describe('The name of the component to get props for.'),
      },
      async ({ framework, component }) => {
        const componentProps = await getComponentProps({ framework, component })

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(componentProps, null, 2),
            },
          ],
        }
      },
    )
  },
}
