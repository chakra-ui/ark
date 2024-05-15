import { codeToHtml } from 'shiki'
import { getServerContext } from '~/lib/server-context'
import { CodeTabs } from './code-tabs'

export const InstallCmd = async () => {
  const examples = await getInstallCmds()

  return <CodeTabs examples={examples} defalutValue="npm" />
}

type PackageManger = 'npm' | 'pnpm' | 'yarn' | 'bun'

const getInstallCmds = async () => {
  const serverContext = getServerContext()
  const framework = serverContext.framework
  const pkgmanagers = ['npm', 'pnpm', 'yarn', 'bun'] as const

  const cmdMap: Record<PackageManger, string> = {
    npm: 'npm install',
    pnpm: 'pnpm install',
    yarn: 'yarn add',
    bun: 'bun add',
  }

  return Promise.all(
    pkgmanagers.map(async (pkgManager) => {
      const packageName = `@ark-ui/${framework}`
      const code = `${cmdMap[pkgManager]} ${packageName}`
      const html = await codeToHtml(code, {
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
