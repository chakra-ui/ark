import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js/jsx-runtime'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.tsx'
import type { UseSelectReturn } from './use-select.ts'
import { SelectProvider } from './use-select-context.ts'
import type { CollectionItem } from '../collection/index.tsx'

interface RootProviderProps<T extends CollectionItem> {
  value: UseSelectReturn<T>
}
export interface SelectRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, UsePresenceProps, PolymorphicProps<'div'> {}
export interface SelectRootProviderProps<T extends CollectionItem>
  extends HTMLProps<'div'>, SelectRootProviderBaseProps<T> {}

export const SelectRootProvider = <T extends CollectionItem>(props: SelectRootProviderProps<T>) => {
  const [presenceProps, selectProps] = splitPresenceProps(props)
  const [{ value: select }, localProps] = createSplitProps<RootProviderProps<T>>()(selectProps, ['value'])
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

export type SelectRootProviderComponent<P = {}> = <T extends CollectionItem>(
  props: Assign<SelectRootProviderProps<T>, P>,
) => JSX.Element
