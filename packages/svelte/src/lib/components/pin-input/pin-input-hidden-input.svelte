<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PinInputHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface PinInputHiddenInputProps extends Assign<HTMLProps<'input'>, PinInputHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePinInputContext } from './use-pin-input-context'

  let { ref = $bindable(null), ...props }: PinInputHiddenInputProps = $props()
  const pinInput = usePinInputContext()
  const mergedProps = $derived(mergeProps(pinInput().getHiddenInputProps(), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
