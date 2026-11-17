<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface StepsListBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface StepsListProps extends Assign<HTMLProps<'div'>, StepsListBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useStepsContext } from './use-steps-context.ts'

  let { ref = $bindable(null), ...props }: StepsListProps = $props()

  const steps = useStepsContext()
  const mergedProps = $derived(mergeProps(steps().getListProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
