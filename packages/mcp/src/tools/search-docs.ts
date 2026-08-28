import { z } from 'zod'
import { searchDocs } from '../lib/fetch.js'
import type { Tool } from '../lib/types.js'

export const searchDocsTool: Tool = {
  name: 'search_docs',
  description:
    'Search Ark UI documentation by keyword. Returns matching pages with slug, title, description, and category. Use get_docs with a returned slug to fetch the full page content.',
  async exec(server, { name, description }) {
    server.registerTool(
      name,
      {
        description,
        inputSchema: {
          query: z.string().min(1).describe('The search query, e.g. "composition", "initial focus", or "styling".'),
        },
      },
      async ({ query }) => {
        const results = await searchDocs(query)

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        }
      },
    )
  },
}
