import { z } from 'zod'
import { getDocs } from '../lib/fetch.js'
import type { Tool } from '../lib/types.js'

export const getDocsTool: Tool = {
  name: 'get_docs',
  description:
    'Get the full markdown documentation for an Ark UI docs page by slug. Prefer search_docs first when the exact slug is unknown.',
  async exec(server, { name, description }) {
    server.registerTool(
      name,
      {
        description,
        inputSchema: {
          slug: z.string().min(1).describe('The docs page slug, e.g. "components/dialog" or "guides/composition".'),
        },
      },
      async ({ slug }) => {
        const doc = await getDocs(slug)

        return {
          content: [
            {
              type: 'text',
              text: doc.content,
            },
          ],
        }
      },
    )
  },
}
