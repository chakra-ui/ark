<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { Snippet } from 'svelte'
  import type { CollectionItem } from '../collection/index.ts'
  import type { UseCommandProps } from './use-command.svelte.ts'

  export interface CommandRootBaseProps<T extends CollectionItem>
    extends Optional<UseCommandProps<T>, 'id'>, PolymorphicProps<'div'>, RefAttribute {}

  export interface CommandRootProps<T extends CollectionItem> extends Assign<
    HTMLProps<'div'>,
    CommandRootBaseProps<T>
  > {}

  export type CommandRootComponentProps<T extends CollectionItem = CollectionItem, P = {}> = Assign<
    CommandRootProps<T>,
    P
  >

  export type CommandRootComponent<P = {}> = <T extends CollectionItem>(
    props: CommandRootComponentProps<T, P>,
  ) => Snippet
</script>

<script lang="ts" generics="T extends CollectionItem">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { parts } from './command.anatomy.ts'
  import { CommandProvider } from './use-command-context.ts'
  import { useCommand } from './use-command.svelte.ts'

  let {
    ref = $bindable(null),
    inputValue = $bindable<string>(),
    highlightedValue = $bindable<string | null>(),
    ...props
  }: CommandRootProps<T> = $props()

  const [useCommandProps, localProps] = $derived(
    createSplitProps<Optional<UseCommandProps<T>, 'id'>>()(props, [
      'autoFocus',
      'collection',
      'defaultHighlightedValue',
      'defaultInputValue',
      'defaultPage',
      'disabled',
      'filter',
      'highlightedValue',
      'id',
      'ids',
      'inputValue',
      'loading',
      'loopFocus',
      'navigate',
      'onHighlightChange',
      'onInputValueChange',
      'onPageChange',
      'onSelect',
      'placeholder',
      'scrollToIndexFn',
      'translations',
    ]),
  )

  const id = $props.id()

  const machineProps = $derived.by<UseCommandProps<T>>(() => ({
    ...useCommandProps,
    id: useCommandProps.id ?? id,
    inputValue,
    highlightedValue,
    onInputValueChange(details) {
      useCommandProps.onInputValueChange?.(details)
      if (inputValue !== undefined) inputValue = details.inputValue
    },
    onHighlightChange(details) {
      useCommandProps.onHighlightChange?.(details)
      if (highlightedValue !== undefined) highlightedValue = details.highlightedValue
    },
  }))

  const command = useCommand(() => machineProps)
  const mergedProps = $derived(mergeProps(command().getRootProps(), parts.root.attrs(''), localProps))

  CommandProvider(command)
</script>

<Ark as="div" bind:ref {...mergedProps} />
