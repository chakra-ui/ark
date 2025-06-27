<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface StepsProgressBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface StepsProgressProps extends Assign<HTMLProps<'div'>, StepsProgressBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useStepsContext } from './use-steps-context'

  let { ref = $bindable(null), ...props }: StepsProgressProps = $props()

  const steps = useStepsContext()
  const mergedProps = $derived(mergeProps(steps().getProgressProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
