import { mergeProps } from '@zag-js/react'
import { type JSX, type Ref, type RefAttributes, forwardRef } from 'react'
import type { CollectionItem } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import type { UseComboboxReturn } from './use-combobox'
import { ComboboxProvider } from './use-combobox-context'

interface RootProviderProps<T extends CollectionItem> {
  value: UseComboboxReturn<T>
}

export interface ComboboxRootProviderProps<T extends CollectionItem>
  extends HTMLArkProps<'div'>,
    RootProviderProps<T>,
    UsePresenceProps {}

const ComboboxImpl = <T extends CollectionItem>(
  props: ComboboxRootProviderProps<T>,
  ref: Ref<HTMLDivElement>,
) => {
  const [presenceProps, comboboxProps] = splitPresenceProps(props)
  const [{ value: combobox }, localProps] = createSplitProps<RootProviderProps<T>>()(
    comboboxProps,
    ['value'],
  )
  const presence = usePresence(mergeProps({ present: combobox.open }, presenceProps))
  const mergedProps = mergeProps(combobox.getRootProps(), localProps)

  return (
    <ComboboxProvider value={combobox}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </ComboboxProvider>
  )
}

export type ComboboxComponent = <T extends CollectionItem>(
  props: ComboboxRootProviderProps<T> & RefAttributes<HTMLDivElement>,
) => JSX.Element

export const ComboboxRootProvider = forwardRef(ComboboxImpl) as ComboboxComponent
