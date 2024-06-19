import { fetchExamplesGroupedByCategory } from './examples'
import { pages } from '.velite'

const components = pages
  .filter((page) => page.category === 'components')
  .map((page) => ({
    label: page.title,
    value: `/docs/${page.slug}`,
    description: page.description,
    category: 'Component',
  }))

const examples = await fetchExamplesGroupedByCategory().then((groups) =>
  groups.flatMap((group) =>
    group.items.map((item) => ({
      label: item.title,
      value: `/examples/${item.id}`,
      description: item.description,
      category: 'Example',
    })),
  ),
)

export const data = { components, examples }
