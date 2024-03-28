import { persistentAtom } from '@nanostores/persistent'

export type SelectedFramework = 'react' | 'vue' | 'svelte'

export const selectedFramework = persistentAtom<SelectedFramework>('ark-ui-framework', 'react')
