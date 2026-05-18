import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../../utils/create-split-props.ts'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseListboxReturn } from './use-listbox.ts'
import { ListboxProvider } from './use-listbox-context.ts'
import type { CollectionItem } from '../collection/index.tsx'

interface RootProviderProps<T extends CollectionItem> {
  value: UseListboxReturn<T>
}
export interface ListboxRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, PolymorphicProps<'div'> {}
export interface ListboxRootProviderProps<T extends CollectionItem>
  extends HTMLProps<'div'>, ListboxRootProviderBaseProps<T> {}

export const ListboxRootProvider = <T extends CollectionItem>(props: ListboxRootProviderProps<T>) => {
  const [{ value: listbox }, localProps] = createSplitProps<RootProviderProps<T>>()(props, ['value'])
  const mergedProps = mergeProps(() => listbox().getRootProps(), localProps)

  return (
    <ListboxProvider value={listbox}>
      <ark.div {...mergedProps} />
    </ListboxProvider>
  )
}

export type ListboxRootProviderComponent<P = {}> = <T extends CollectionItem>(
  props: Assign<ListboxRootProviderProps<T>, P>,
) => JSX.Element
