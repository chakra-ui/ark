<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface StepsTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface StepsTriggerProps extends Assign<HTMLProps<'button'>, StepsTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useStepsContext } from './use-steps-context'
  import { useStepsItemPropsContext } from './use-steps-item-props-context'

  let { ref = $bindable(null), ...props }: StepsTriggerProps = $props()

  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = $derived(mergeProps(steps().getTriggerProps(itemProps()), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
