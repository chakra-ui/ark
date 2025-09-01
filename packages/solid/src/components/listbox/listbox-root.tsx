import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import type { CollectionItem } from '../collection'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseListboxProps, useListbox } from './use-listbox'
import { ListboxProvider } from './use-listbox-context'

export interface ListboxRootBaseProps<T extends CollectionItem> extends UseListboxProps<T>, PolymorphicProps<'div'> {}
export interface ListboxRootProps<T extends CollectionItem> extends Assign<HTMLProps<'div'>, ListboxRootBaseProps<T>> {}

export const ListboxRoot = <T extends CollectionItem>(props: ListboxRootProps<T>) => {
  const [useListboxProps, localProps] = createSplitProps<UseListboxProps<T>>()(props, [
    'collection',
    'defaultHighlightedValue',
    'defaultValue',
    'deselectable',
    'disabled',
    'disallowSelectAll',
    'highlightedValue',
    'id',
    'ids',
    'loopFocus',
    'onHighlightChange',
    'onSelect',
    'onValueChange',
    'orientation',
    'scrollToIndexFn',
    'selectionMode',
    'selectOnHighlight',
    'typeahead',
    'value',
  ])

  const listbox = useListbox(useListboxProps)
  const mergedProps = mergeProps(() => listbox().getRootProps(), localProps)

  return (
    <ListboxProvider value={listbox}>
      <ark.div {...mergedProps} />
    </ListboxProvider>
  )
}

export type ListboxRootComponent<P = {}> = <T extends CollectionItem>(props: Assign<ListboxRootProps<T>, P>) => any
