import { openInStackblitzReact } from './stackblitz-react'
import { openInStackblitzSolid } from './stackblitz-solid'
import { openInStackblitzSvelte } from './stackblitz-svelte'
import { openInStackblitzVue } from './stackblitz-vue'

export type Framework = 'react' | 'solid' | 'vue' | 'svelte'

export interface StackblitzOptions {
  code: string
  cssModules: Record<string, string>
  id: string
  component: string
}

const handlers: Record<Framework, (opts: StackblitzOptions) => void> = {
  react: openInStackblitzReact,
  solid: openInStackblitzSolid,
  vue: openInStackblitzVue,
  svelte: openInStackblitzSvelte,
}

export const openInStackblitz = (framework: Framework, opts: StackblitzOptions): void => {
  handlers[framework]?.(opts)
}
