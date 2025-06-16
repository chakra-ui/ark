<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface StepsPrevTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface StepsPrevTriggerProps extends Assign<HTMLProps<'button'>, StepsPrevTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useStepsContext } from './use-steps-context'

  const props: StepsPrevTriggerProps = $props()

  const steps = useStepsContext()
  const mergedProps = $derived(mergeProps(steps().getPrevTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
