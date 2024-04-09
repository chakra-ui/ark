import { persistentAtom } from '@nanostores/persistent'

export type SelectedFramework = 'react' | 'solid' | 'vue'

export const selectedFramework = persistentAtom<SelectedFramework>('ark-ui-framework', 'react')
