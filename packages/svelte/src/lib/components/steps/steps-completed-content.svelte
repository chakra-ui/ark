<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface StepsCompletedContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface StepsCompletedContentProps extends Assign<HTMLProps<'div'>, StepsCompletedContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useStepsContext } from './use-steps-context'

  let { ref = $bindable(), ...props }: StepsCompletedContentProps = $props()

  const steps = useStepsContext()
  const mergedProps = $derived(mergeProps(steps().getContentProps({ index: steps().count }), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
