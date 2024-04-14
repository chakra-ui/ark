import { readFile } from 'node:fs/promises'
import path, { basename, dirname, join } from 'node:path'
import { findUpSync } from 'find-up'
import { outputFile } from 'fs-extra'
import { globby } from 'globby'
import prettier from 'prettier'
import { Node, Project } from 'ts-morph'
import { match } from 'ts-pattern'

type Stories = Record<string, string>

const prettierConfig = await prettier.resolveConfig('.')

function format(stories: Stories) {
  return prettier.format(JSON.stringify(stories), {
    ...prettierConfig,
    parser: 'json',
  })
}

const isComponent = (str: string) => str.charAt(0) === str.charAt(0).toUpperCase()

const extractScriptSetup = (fileContent: string): string | null => {
  const match = fileContent.match(/<script setup lang="ts">([\s\S]+?)<\/script>/)
  if (match) {
    return match[1]
      .trim()
      .replace(/import\s+\{([^\}]+)\}\s+from\s+'\.\.\/?'/g, "import {$1} from '@ark-ui/vue'")
      .replace(
        /import\s+\{\sPortal\s\}\sfrom\s'..\/portal'/g,
        "import { Portal } from '@ark-ui/vue'",
      )
      .replace(/^import\s+'.+\.css'\s*$/gm, '')
  }
  return null
}

const parseVueTemplate = async (fileContent: string): Promise<Stories> => {
  const scriptSetup = extractScriptSetup(fileContent)
  const pattern = /<Variant title="([^"]+)">([\s\S]+?)<\/Variant>/g
  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let match
  const output: Stories = {}
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  while ((match = pattern.exec(fileContent)) !== null) {
    const title = match[1]
    const content = match[2].trim()
    const template = await prettier.format(
      `<script setup lang="ts">\n${scriptSetup}\n</script>\n\n<template>${content}</template>`,
      {
        ...prettierConfig,
        plugins: ['prettier-plugin-organize-imports'],
        parser: 'vue',
      },
    )
    output[title] = template
  }
  return output
}

const extractStoriesForFramework = async (framework: string) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const rootDir = dirname(findUpSync('bun.lockb')!)
  process.chdir(path.join(rootDir, 'frameworks', framework))

  const outDir = join(rootDir, 'website', 'src', 'content', 'stories')

  const project = new Project({})
  project.addSourceFilesAtPaths('src/**/*.stories.tsx')

  await Promise.all(
    project.getSourceFiles().map(async (sourceFile) => {
      const stories: Record<string, string> = {}

      const component = sourceFile.getBaseNameWithoutExtension().split('.')[0]

      let imports = ''
      // biome-ignore lint/complexity/noForEach: <explanation>
      sourceFile.getImportDeclarations().forEach((importDecl) => {
        const importText = importDecl
          .getText()
          .replace(
            /import\s+\{([^\}]+)\}\s+from\s+'\.\.\/?'/g,
            `import {$1} from '@ark-ui/${framework}'`,
          )
          .replace(
            /import\s+\{\sPortal\s\}\sfrom\s'..\/..\/portal'/g,
            `import { Portal } from '@ark-ui/${framework}'`,
          )
          .replace(/@zag-js\/react/g, '@ark-ui/react')

        if (!importText.includes('.css') && !importText.includes('storybook')) {
          imports += `${importText}\n`
        }
      })

      const exportedDeclarations = sourceFile.getExportedDeclarations().values()

      for (const decls of exportedDeclarations) {
        for (const decl of decls) {
          await match(decl)
            .when(Node.isVariableDeclaration, async (node) => {
              const name = node.getName()
              if (!isComponent(name)) return
              const code = `${imports}\nconst ${name} = ${node.getInitializer()?.getText()}`
              const content = await prettier.format(code, {
                ...prettierConfig,
                plugins: ['prettier-plugin-organize-imports'],
                parser: 'typescript',
              })
              stories[name] = content
            })
            .run()
        }
      }

      const outPath = join(outDir, framework, `${component}.stories.json`)
      return outputFile(outPath, await format(stories))
    }),
  )

  const vueStories = await globby(['src/**/*.story.vue'])
  await Promise.all(
    vueStories.map(async (story) => {
      const fileContent = await readFile(story, {
        encoding: 'utf8',
      }).catch(() => undefined)
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const stories = await parseVueTemplate(fileContent!)
      const outPath = join(outDir, 'vue', `${basename(story, '.story.vue')}.stories.json`)
      return outputFile(outPath, await format(stories))
    }),
  )
}

const main = async () => {
  extractStoriesForFramework('react')
    .then(() => extractStoriesForFramework('solid'))
    .then(() => extractStoriesForFramework('vue'))
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
