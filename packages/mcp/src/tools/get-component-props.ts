import { z } from 'zod'
import { resolveComponent } from '../lib/components.js'
import { getComponentProps } from '../lib/fetch.js'
import { FRAMEWORKS, type Tool } from '../lib/types.js'

export const getComponentPropsTool: Tool = {
  name: 'get_component_props',
  description:
    'Get the props/properties for a specific Ark UI component in a given framework. This tool retrieves detailed information about the available props for the specified component.',
  async exec(server, { name, description }) {
    server.registerTool(
      name,
      {
        description,
        inputSchema: {
          framework: z.enum(FRAMEWORKS).describe('The framework type to get component props for.'),
          component: z
            .string()
            .min(1)
            .describe('The component name, e.g. "dialog" or "date-picker". Call list_components for the full list.'),
        },
      },
      async ({ framework, component: name }) => {
        const component = await resolveComponent(framework, name)
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
