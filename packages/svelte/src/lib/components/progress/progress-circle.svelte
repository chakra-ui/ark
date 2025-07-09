<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ProgressCircleBaseProps extends PolymorphicProps<'svg'>, RefAttribute {}
  export interface ProgressCircleProps extends HTMLProps<'svg'>, ProgressCircleBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useProgressContext } from './use-progress-context'

  let { ref = $bindable(null), ...props }: ProgressCircleProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getCircleProps(), props))
</script>

<Ark as="svg" bind:ref {...mergedProps} />
