<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface StepsListBaseProps extends PolymorphicProps<'ol'>, RefAttribute {}
  export interface StepsListProps extends Assign<HTMLProps<'ol'>, StepsListBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useStepsContext } from './use-steps-context'

  let { ref = $bindable(), ...props }: StepsListProps = $props()

  const steps = useStepsContext()
  const mergedProps = $derived(mergeProps(steps().getListProps(), props))
</script>

<Ark as="ol" bind:ref {...mergedProps} />
