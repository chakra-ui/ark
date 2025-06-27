<script lang="ts" generics="T extends CollectionItem">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'
  import { mergeProps } from '@zag-js/svelte'
  import type { CollectionItem } from '../collection/index.js'
  import { Ark } from '../factory/index.js'
  import { ListboxProvider } from './use-listbox-context.js'
  import { type UseListboxProps, useListbox } from './use-listbox.svelte.js'
  import { createSplitProps } from '$lib/utils/create-split-props.js'

  export interface ListboxRootBaseProps<T extends CollectionItem> extends UseListboxProps<T>, PolymorphicProps<'div'> {}
  export interface ListboxRootProps<T extends CollectionItem>
    extends Assign<HTMLProps<'div'>, ListboxRootBaseProps<T>> {}

  let { highlightedValue = $bindable(), value = $bindable(), ...props }: ListboxRootProps<T> = $props()
  const providedId = $props.id()

  const [listboxProps, localProps] = $derived(
    createSplitProps<UseListboxProps<T>>()(props, [
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
    ]),
  )

  const resolvedProps = $derived<UseListboxProps<T>>({
    ...listboxProps,
    id: listboxProps.id ?? providedId,
    highlightedValue,
    onHighlightChange(details) {
      listboxProps.onHighlightChange?.(details)
      if (highlightedValue !== undefined) highlightedValue = details.highlightedValue
    },
    value,
    onValueChange(details) {
      listboxProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const listbox = useListbox(() => resolvedProps)
  const mergedProps = $derived(mergeProps(listbox().getRootProps(), localProps))

  ListboxProvider(listbox)
</script>

<Ark as="div" {...mergedProps} />
