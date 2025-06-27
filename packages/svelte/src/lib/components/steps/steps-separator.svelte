<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface StepsSeparatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface StepsSeparatorProps extends Assign<HTMLProps<'div'>, StepsSeparatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useStepsContext } from './use-steps-context'
  import { useStepsItemPropsContext } from './use-steps-item-props-context'

  let { ref = $bindable(), ...props }: StepsSeparatorProps = $props()

  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = $derived(mergeProps(steps().getSeparatorProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
