<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'
  import type { Snippet } from 'svelte'
  import type { CollectionItem } from '../collection/index.js'
  import type { UsePresenceProps } from '../presence/use-presence.svelte.js'
  import type { UseComboboxReturn } from './use-combobox.svelte.js'

  interface RootProviderProps<T extends CollectionItem> {
    value: UseComboboxReturn<T>
  }

  export interface ComboboxRootProviderBaseProps<T extends CollectionItem>
    extends RootProviderProps<T>,
      UsePresenceProps,
      PolymorphicProps<'div'> {
    children?: Snippet
  }
  export interface ComboboxRootProviderProps<T extends CollectionItem>
    extends Assign<HTMLProps<'div'>, ComboboxRootProviderBaseProps<T>> {}
</script>

<script lang="ts" generics="T extends CollectionItem">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { PresenceProvider, splitPresenceProps, usePresence } from '../presence/index.js'
  import { ComboboxProvider } from './use-combobox-context.js'

  let { value, children, ...props }: ComboboxRootProviderProps<T> = $props()

  const [presenceProps, otherProps] = splitPresenceProps(props)
  const presence = usePresence(() => mergeProps({ present: value().open }, presenceProps))
  const mergedProps = $derived(mergeProps(value().getRootProps(), otherProps))

  ComboboxProvider(value)
  PresenceProvider(presence)
</script>

<Ark as="div" {...mergedProps}>
  {@render children?.()}
</Ark>
