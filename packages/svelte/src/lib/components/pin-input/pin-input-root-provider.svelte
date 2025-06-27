<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UsePinInputReturn } from './use-pin-input.svelte'

  interface RootProviderProps {
    value: UsePinInputReturn
  }

  export interface PinInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface PinInputRootProviderProps extends PinInputRootProviderBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { PinInputProvider } from './use-pin-input-context'
  import { Ark } from '../factory'

  let { ref = $bindable(null), value, ...props }: PinInputRootProviderProps = $props()

  PinInputProvider(value)
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
