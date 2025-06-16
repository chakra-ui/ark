import type { Accessor } from '$lib/types.js'
import type * as listbox from '@zag-js/listbox'
import type { PropTypes } from '@zag-js/svelte'
import { createContext } from '../../utils/create-context.js'
import type { CollectionItem } from '../collection/index.js'

export interface UseListboxContext<T extends CollectionItem> extends Accessor<listbox.Api<PropTypes, T>> {}

export const [ListboxProvider, useListboxContext] = createContext<UseListboxContext<CollectionItem>>({
  name: 'ListboxContext',
  hookName: 'useListboxContext',
  providerName: '<ListboxProvider />',
})
