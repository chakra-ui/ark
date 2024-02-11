import { persistentAtom } from '@nanostores/persistent'

export const selectedFramework = persistentAtom<string>('ark-ui-framework', 'react')
