import { z } from 'zod'
import { resolveComponent } from '../lib/components.js'
import { getExample } from '../lib/fetch.js'
import { FRAMEWORKS, type Tool } from '../lib/types.js'

export const getExampleTool: Tool = {
  name: 'get_example',
  description: 'Retrieve a specific example from Ark UI based on the framework and component type.',
  async exec(server, { name, description }) {
    server.registerTool(
      name,
      {
        description,
        inputSchema: {
          exampleId: z
            .string()
            .describe(
              'The ID of the example of the component to retrieve. This can be derived from call the list_examples tool.',
            ),
          framework: z.enum(FRAMEWORKS).describe('The framework type.'),
          component: z
            .string()
            .min(1)
            .describe('The component name, e.g. "dialog" or "date-picker". Call list_components for the full list.'),
        },
      },
      async ({ framework, component: name, exampleId }) => {
        const component = await resolveComponent(framework, name)
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
