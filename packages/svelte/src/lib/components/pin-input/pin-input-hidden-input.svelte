<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PinInputHiddenInputBaseProps extends PolymorphicProps<'input'> {}
  export interface PinInputHiddenInputProps extends Assign<HTMLProps<'input'>, PinInputHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePinInputContext } from './use-pin-input-context'

  const props: PinInputHiddenInputProps = $props()
  const pinInput = usePinInputContext()
  const mergedProps = $derived(mergeProps(pinInput().getHiddenInputProps(), props))
</script>

<Ark as="input" {...mergedProps} />
