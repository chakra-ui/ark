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

export const isStackblitzFramework = (framework: string): framework is Framework => {
  return Object.hasOwn(handlers, framework)
}

export const openInStackblitz = (framework: string, opts: StackblitzOptions): void => {
  if (!isStackblitzFramework(framework)) return
  handlers[framework](opts)
}
