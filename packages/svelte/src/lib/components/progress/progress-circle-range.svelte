<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ProgressCircleRangeBaseProps extends PolymorphicProps<'circle'>, RefAttribute {}
  export interface ProgressCircleRangeProps extends HTMLProps<'circle'>, ProgressCircleRangeBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useProgressContext } from './use-progress-context'

  let { ref = $bindable(null), ...props }: ProgressCircleRangeProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getCircleRangeProps(), props))
</script>

<Ark as="circle" bind:ref {...mergedProps} />
