import type { TransformDef } from './types.ts'
import { reactAsChildToRender } from './transforms/as-child-to-render/react.ts'
import { solidAsChildToRender } from './transforms/as-child-to-render/solid.ts'
import { svelteAsChildToRender } from './transforms/as-child-to-render/svelte.ts'
import { vueAsChildToRender } from './transforms/as-child-to-render/vue.ts'
import { cssDataAttributes } from './transforms/data-attributes/css.ts'
import {
  type RenameFramework,
  renameFrameworkExtensions,
  renameRun,
  renameTransforms,
} from './transforms/rename-props/configs.ts'

const renameFrameworks: RenameFramework[] = ['react', 'solid', 'svelte', 'vue']

const partTagPattern = (parts: string[]) => {
  const pattern = new RegExp(`<[\\w$.]*(?:${[...new Set(parts)].join('|')})\\b`)
  return (source: string) => pattern.test(source)
}

const mentionsAsChild = (source: string) => source.includes('asChild') || source.includes('as-child')

const propRenameTransforms: TransformDef[] = renameTransforms.flatMap((def) =>
  renameFrameworks.map((framework) => ({
    name: `${framework}/${def.slug}`,
    description: def.description,
    extensions: renameFrameworkExtensions[framework],
    prefilter: partTagPattern(def.rules.map((rule) => rule.part)),
    run: renameRun(def.slug, framework),
  })),
)

export const transforms: TransformDef[] = [
  {
    name: 'react/as-child-to-render',
    description: 'Lift the asChild child element into a render prop',
    extensions: ['.tsx', '.jsx'],
    prefilter: mentionsAsChild,
    run: reactAsChildToRender,
  },
  {
    name: 'solid/as-child-to-render',
    description: 'Rename the asChild callback to render',
    extensions: ['.tsx', '.jsx'],
    prefilter: mentionsAsChild,
    run: solidAsChildToRender,
  },
  {
    name: 'vue/as-child-to-render',
    description: 'Turn asChild into a #render slot and bind props on the child',
    extensions: ['.vue'],
    prefilter: mentionsAsChild,
    run: vueAsChildToRender,
  },
  {
    name: 'svelte/as-child-to-render',
    description: 'Rename the asChild snippet to render',
    extensions: ['.svelte'],
    prefilter: mentionsAsChild,
    run: svelteAsChildToRender,
  },
  ...propRenameTransforms,
  {
    name: 'css/data-attributes',
    description: 'Merge data-scope/data-part selectors and update toggle state selectors',
    extensions: ['.css', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.vue', '.svelte'],
    prefilter: (source) => source.includes('[data-'),
    run: cssDataAttributes,
  },
]

export function findTransform(name: string): TransformDef | undefined {
  return transforms.find((t) => t.name === name)
}
