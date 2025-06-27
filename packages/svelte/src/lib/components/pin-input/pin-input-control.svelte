<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PinInputControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface PinInputControlProps extends Assign<HTMLProps<'div'>, PinInputControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePinInputContext } from './use-pin-input-context'

  let { ref = $bindable(), ...props }: PinInputControlProps = $props()
  const pinInput = usePinInputContext()
  const mergedProps = $derived(mergeProps(pinInput().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
