<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface StepsIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface StepsIndicatorProps extends Assign<HTMLProps<'div'>, StepsIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useStepsContext } from './use-steps-context'
  import { useStepsItemPropsContext } from './use-steps-item-props-context'

  let { ref = $bindable(), ...props }: StepsIndicatorProps = $props()

  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = $derived(mergeProps(steps().getIndicatorProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
