import fs from 'node:fs'
import { basename, dirname, join, parse, resolve } from 'node:path'
import { globby } from 'globby'
import { type ExportDeclaration, Node, Project } from 'ts-morph'

function groupPathsByComponent(paths: string[]) {
  return paths.reduce(
    (acc, path) => {
      const component = path.split('/')[5]
      acc[component] = acc[component] || []
      acc[component].push(path)
      return acc
    },
    {} as Record<string, string[]>,
  )
}

const extractStoriesForFramework = async (framework: 'solid' | 'react') => {
  const stories = await globby([`./frameworks/${framework}/src/**/*.stories.tsx`])

  stories
    .map((story) => ({
      name: parse(story).name.split('.')?.[0],
      examples: getExportedExamples(story),
    }))
    .map((story) => {
      const content = story.examples
        .map((example) => {
          const storyName = parse(example)
            .name.split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('')
          const code = fs.readFileSync(example, 'utf-8')
          return {
            [storyName]: polishCode(code, framework),
          }
        })
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        .reduce((acc, curr) => ({ ...acc, ...curr }), {})

      fs.writeFileSync(
        `./website/src/content/stories/${framework}/${story.name}.stories.json`,
        JSON.stringify(content),
      )
    })
}

const main = async () => {
  await extractStoriesForFramework('solid')
  await extractStoriesForFramework('react')
}

main()
  .then(() => {
    console.log('Done')
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

const polishCode = (code: string, framework: string) => {
  const project = new Project({
    useInMemoryFileSystem: true,
  })
  const sourceFile = project.createSourceFile('File.tsx', code)
  sourceFile.forEachDescendant((node) => {
    if (Node.isImportDeclaration(node)) {
      if (node.getModuleSpecifier().getLiteralText().startsWith('.')) {
        node.setModuleSpecifier(`@ark-ui/${framework}`)
      }
    }
  })

  return sourceFile.getText()
}

const getExportedExamples = (story: string): string[] => {
  const content = fs.readFileSync(story, 'utf-8')
  const project = new Project({
    useInMemoryFileSystem: true,
  })
  const sourceFile = project.createSourceFile('File.tsx', content)
  return sourceFile
    .forEachDescendantAsArray()
    .filter((node): node is ExportDeclaration => Node.isExportDeclaration(node))
    .map((node) => join(dirname(story), `${node.getModuleSpecifier()?.getLiteralText() ?? ''}.tsx`))
}
