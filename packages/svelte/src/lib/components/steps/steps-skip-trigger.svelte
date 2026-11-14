<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface StepsSkipTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface StepsSkipTriggerProps extends Assign<HTMLProps<'button'>, StepsSkipTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useStepsContext } from './use-steps-context.ts'

  let { ref = $bindable(null), ...props }: StepsSkipTriggerProps = $props()

  const steps = useStepsContext()
  const mergedProps = $derived(mergeProps(steps().getSkipTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
