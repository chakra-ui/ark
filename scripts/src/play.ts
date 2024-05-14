import { parse } from 'node:path'
import { outputFileSync, readJsonSync } from 'fs-extra'
import { globby } from 'globby'

const toKebabCase = (str: string) => {
  return (
    str
      // Insert a hyphen before each uppercase letter, except at the start
      .replace(/(.)([A-Z])/g, '$1-$2')
      // Convert the entire string to lowercase
      .toLowerCase()
  )
}

const stories = await globby('../website/src/content/stories/solid/*.stories.json')

stories.sort().map((story) => {
  const component = toKebabCase(parse(story).name.split('.')[0])
  const content = readJsonSync(story) as Record<string, string>

  Object.entries(content).map(([key, value]) => {
    const name = toKebabCase(key)
    outputFileSync(
      `../packages/solid/src/components/${component}/examples/${name}.tsx`,
      value.replace('@ark-ui/solid', '../..').replace('const', 'export const'),
    )
  })

  // date-picker -> DatePicker
  const componentName = component
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  const meta = `import type { Meta } from '@storybook/solid'

const meta: Meta = {
  title: 'Components / ${componentName}',
}

export default meta

`

  const exports = Object.keys(content)
    .map((key) => {
      const name = toKebabCase(key)
      return `export { ${key} } from './examples/${name}'`
    })
    .join('\n')

  outputFileSync(
    `../packages/solid/src/components/${component}/${component}.stories.tsx`,
    `${meta}${exports}`,
  )
})
