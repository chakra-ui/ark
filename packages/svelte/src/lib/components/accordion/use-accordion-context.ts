import type { Accessor } from '$lib/types'
import type { Api } from '@zag-js/accordion'
import type { PropTypes } from '@zag-js/svelte'
import { createContext } from '../../utils/create-context'

export interface UseAccordionContext extends Accessor<Api<PropTypes>> {}

export const [AccordionProvider, useAccordionContext] = createContext<UseAccordionContext>({
  name: 'AccordionContext',
  hookName: 'useAccordionContext',
  providerName: '<AccordionProvider />',
})
