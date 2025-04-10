<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'
  import type { ViewProps } from '@zag-js/progress'

  export interface ProgressViewBaseProps extends ViewProps, PolymorphicProps<'span'> {}
  export interface ProgressViewProps extends HTMLProps<'span'>, ProgressViewBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useProgressContext } from './use-progress-context'

  const props: ProgressViewProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getViewProps(props), props))
</script>

<Ark as="span" {...mergedProps} />
