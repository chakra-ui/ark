<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ProgressLabelBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface ProgressLabelProps extends HTMLProps<'span'>, ProgressLabelBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useProgressContext } from './use-progress-context.ts'

  let { ref = $bindable(null), ...props }: ProgressLabelProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getLabelProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
