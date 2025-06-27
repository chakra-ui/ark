<script module lang="ts">
  import type { InputProps } from '@zag-js/pin-input'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PinInputInputBaseProps extends InputProps, PolymorphicProps<'input'>, RefAttribute {}
  export interface PinInputInputProps extends Assign<HTMLProps<'input'>, PinInputInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { usePinInputContext } from './use-pin-input-context'

  let { ref = $bindable(null), ...props }: PinInputInputProps = $props()
  const pinInput = usePinInputContext()

  const [inputProps, localProps] = $derived(createSplitProps<InputProps>()(props, ['index']))

  const mergedProps = $derived(mergeProps(pinInput().getInputProps(inputProps), localProps))
</script>

<Ark as="input" bind:ref {...mergedProps} />
