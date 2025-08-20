import { getHighlighter } from '~/lib/highlighter'
import { getFramework } from '~/lib/frameworks'
import { CodeTabs } from './code-tabs'

export const InstallCmd = async () => {
  const examples = await getInstallCmds()

  return <CodeTabs examples={examples} defaultValue="npm" />
}

type PackageManger = 'npm' | 'pnpm' | 'yarn' | 'bun'

export const cmdMap: Record<PackageManger, string> = {
  npm: 'npm install',
  pnpm: 'pnpm install',
  yarn: 'yarn add',
  bun: 'bun add',
}

const getInstallCmds = async () => {
  const framework = await getFramework()
  const pkgmanagers = ['npm', 'pnpm', 'yarn', 'bun'] as const
  const highlighter = await getHighlighter()

  return Promise.all(
    pkgmanagers.map(async (pkgManager) => {
      const packageName = `@ark-ui/${framework}`
      const code = `${cmdMap[pkgManager]} ${packageName}`
      const html = highlighter.codeToHtml(code, {
        lang: 'bash',
        theme: 'github-dark-default',
      })

      return {
        label: pkgManager,
        value: pkgManager,
        code,
        html,
      }
    }),
  )
}
