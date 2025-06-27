<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface StepsNextTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface StepsNextTriggerProps extends Assign<HTMLProps<'button'>, StepsNextTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useStepsContext } from './use-steps-context'

  let { ref = $bindable(), ...props }: StepsNextTriggerProps = $props()

  const steps = useStepsContext()
  const mergedProps = $derived(mergeProps(steps().getNextTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
