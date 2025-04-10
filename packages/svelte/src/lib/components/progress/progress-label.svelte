<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ProgressLabelBaseProps extends PolymorphicProps<'label'> {}
  export interface ProgressLabelProps extends HTMLProps<'label'>, ProgressLabelBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useProgressContext } from './use-progress-context'

  const props: ProgressLabelProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getLabelProps(), props))
</script>

<Ark as="label" {...mergedProps} />
