<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PinInputLabelBaseProps extends PolymorphicProps<'label'> {}
  export interface PinInputLabelProps extends Assign<HTMLProps<'label'>, PinInputLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePinInputContext } from './use-pin-input-context'

  const props: PinInputLabelProps = $props()
  const pinInput = usePinInputContext()
  const mergedProps = $derived(mergeProps(pinInput().getLabelProps(), props))
</script>

<Ark as="label" {...mergedProps} />
