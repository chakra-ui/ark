<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ProgressRangeBaseProps extends PolymorphicProps<'div'> {}
  export interface ProgressRangeProps extends HTMLProps<'div'>, ProgressRangeBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useProgressContext } from './use-progress-context'

  const props: ProgressRangeProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getRangeProps(), props))
</script>

<Ark as="div" {...mergedProps} />
