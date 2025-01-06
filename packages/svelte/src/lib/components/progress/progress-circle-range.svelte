<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ProgressCircleRangeBaseProps extends PolymorphicProps<'circle'> {}
  export interface ProgressCircleRangeProps
    extends HTMLProps<'circle'>,
      ProgressCircleRangeBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useProgressContext } from './use-progress-context'

  const props: ProgressCircleRangeProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getCircleRangeProps(), props))
</script>

<Ark as="circle" {...mergedProps} />
