import { z } from 'zod'
import { resolveComponent } from '../lib/components.js'
import { listComponentExamples } from '../lib/fetch.js'
import { FRAMEWORKS, type Tool } from '../lib/types.js'

export const listExamplesTool: Tool = {
  name: 'list_examples',
  description: 'List all examples for a specific component in Ark UI.',
  async exec(server, { name, description }) {
    server.registerTool(
      name,
      {
        description,
        inputSchema: {
          framework: z.enum(FRAMEWORKS).describe('The framework type to list components for.'),
          component: z
            .string()
            .min(1)
            .describe('The component name, e.g. "dialog" or "date-picker". Call list_components for the full list.'),
        },
      },
      async ({ framework, component: name }) => {
        const component = await resolveComponent(framework, name)
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
