import { notFound } from 'next/navigation'
import { getSidebarGroups } from '~/lib/sidebar'

interface RouteContext {
  params: Promise<{ slug: string[] }>
}

const pages = getSidebarGroups().flat()

export async function GET(_request: Request, context: RouteContext) {
  const params = await context.params
  let slugParts = params.slug

  const lastPart = slugParts[slugParts.length - 1]
  if (lastPart.endsWith('.mdx')) {
    slugParts = [...slugParts.slice(0, -1), lastPart.slice(0, -4)]
  }

  const fullSlug = slugParts.join('/')
  const page = pages.find((p) => p.slugs.join('/') === fullSlug)

  if (!page || !page.data.llm) {
    notFound()
  }

  const content = generateLlmContent(page)

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

function generateLlmContent(page: (typeof pages)[0]) {
  const sourceUrl = `https://raw.githubusercontent.com/chakra-ui/ark/refs/heads/main/website/src/content/pages/${page.slugs.join('/')}.mdx`

  const header = `# ${page.data.title}

URL: https://ark-ui.com/docs/${page.slugs.join('/')}
Source: ${sourceUrl}

${page.data.description || ''}

---

`

  return `${header}${page.data.llm}`
}
