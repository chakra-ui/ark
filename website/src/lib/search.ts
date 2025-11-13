import { fetchExamplesGroupedByCategory } from './examples'
import { pageSource } from './source'

const components = pageSource
  .getPages()
  .filter((page) => page.data.category === 'components')
  .map((page) => ({
    label: page.data.title,
    value: `/docs/${page.slugs.join('/')}`,
    description: page.data.description,
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
