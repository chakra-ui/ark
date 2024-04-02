import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async ({ props }) => {
  return new Response(JSON.stringify(props.entry), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function getStaticPaths() {
  const collections = await getCollection('types')
  return collections.map((entry) => {
    const [framework, component] = entry.id.split('/')
    return {
      params: { framework, component: component.split('.')[0] },
      props: { entry },
    }
  })
}
