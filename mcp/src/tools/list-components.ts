import { z } from 'zod'
import { fetchComponentList } from '../lib/fetch.js'
import { FRAMEWORKS, type Tool } from '../lib/types.js'

export const listComponentsTool: Tool<{ componentList: string[] }> = {
  name: 'list_components',
  description:
    'List all available components in Ark UI based on the framework type. This tool retrieves the names of all available Ark UI components.',
  async exec(server, { name, description }) {
    server.tool(
      name,
      description,
      {
        framework: z.enum(FRAMEWORKS).describe('The framework type to list components for.'),
      },
      async ({ framework }) => {
        const componentList = await fetchComponentList(framework)

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(componentList, null, 2),
            },
          ],
        }
      },
    )
  },
}
