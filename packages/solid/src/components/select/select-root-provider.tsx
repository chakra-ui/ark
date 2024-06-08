import { mergeProps } from '@zag-js/solid'
import type { CollectionItem } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import type { UseSelectReturn } from './use-select'
import { SelectProvider } from './use-select-context'

interface RootProviderProps<T extends CollectionItem> {
  value: UseSelectReturn<T>
}

export interface SelectRootProviderProps<T extends CollectionItem>
  extends HTMLArkProps<'div'>,
    RootProviderProps<T>,
    UsePresenceProps {}

export const SelectRootProvider = <T extends CollectionItem>(props: SelectRootProviderProps<T>) => {
  const [presenceProps, selectProps] = splitPresenceProps(props)
  const [{ value: select }, localProps] = createSplitProps<RootProviderProps<T>>()(selectProps, [
    'value',
  ])
  const presence = usePresence(mergeProps(() => ({ present: select().open }), presenceProps))
  const mergedProps = mergeProps(() => select().getRootProps(), localProps)

  return (
    <SelectProvider value={select}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </SelectProvider>
  )
}
