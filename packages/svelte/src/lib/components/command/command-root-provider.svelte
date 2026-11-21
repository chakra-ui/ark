<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { Snippet } from 'svelte'
  import type { CollectionItem } from '../collection/index.ts'
  import type { UseCommandReturn } from './use-command.svelte.ts'

  interface RootProviderProps<T extends CollectionItem> {
    value: UseCommandReturn<T>
  }

  export interface CommandRootProviderBaseProps<T extends CollectionItem>
    extends RootProviderProps<T>, PolymorphicProps<'div'>, RefAttribute {}
  export interface CommandRootProviderProps<T extends CollectionItem> extends Assign<
    HTMLProps<'div'>,
    CommandRootProviderBaseProps<T>
  > {}

  export type CommandRootProviderComponent<P = {}> = <T extends CollectionItem>(
    props: Assign<CommandRootProviderProps<T>, P>,
  ) => Snippet
</script>

<script lang="ts" generics="T extends CollectionItem">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { parts } from './command.anatomy.ts'
  import { CommandProvider } from './use-command-context.ts'

  let { ref = $bindable(null), value, ...props }: CommandRootProviderProps<T> = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), parts.root.attrs(''), props))

  CommandProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
