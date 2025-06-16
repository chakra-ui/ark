import { createContext } from '$lib/utils/create-context'
import type * as menu from '@zag-js/menu'
import type { PropTypes } from '@zag-js/svelte'

export type UseMenuTriggerItemContext = () => ReturnType<menu.Api<PropTypes>['getTriggerItemProps']> | undefined

export const [MenuTriggerItemProvider, useMenuTriggerItemContext] = createContext<UseMenuTriggerItemContext>({
  name: 'MenuTriggerItemContext',
  hookName: 'useMenuTriggerItemContext',
  providerName: '<MenuTriggerItemProvider />',
  strict: false,
})
