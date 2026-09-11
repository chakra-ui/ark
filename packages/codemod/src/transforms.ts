import type { TransformDef } from './types.ts'
import { reactAsChildToRender } from './transforms/as-child-to-render/react.ts'
import { solidAsChildToRender } from './transforms/as-child-to-render/solid.ts'
import { svelteAsChildToRender } from './transforms/as-child-to-render/svelte.ts'
import { vueAsChildToRender } from './transforms/as-child-to-render/vue.ts'

export const transforms: TransformDef[] = [
  {
    name: 'react/as-child-to-render',
    description: 'Lift the asChild child element into a render prop',
    extensions: ['.tsx', '.jsx'],
    run: reactAsChildToRender,
  },
  {
    name: 'solid/as-child-to-render',
    description: 'Rename the asChild callback to render and drop the props accessor call',
    extensions: ['.tsx', '.jsx'],
    run: solidAsChildToRender,
  },
  {
    name: 'vue/as-child-to-render',
    description: 'Turn asChild into a #render slot and bind props on the child',
    extensions: ['.vue'],
    run: vueAsChildToRender,
  },
  {
    name: 'svelte/as-child-to-render',
    description: 'Rename the asChild snippet to render',
    extensions: ['.svelte'],
    run: svelteAsChildToRender,
  },
]

export function findTransform(name: string): TransformDef | undefined {
  return transforms.find((t) => t.name === name)
}
