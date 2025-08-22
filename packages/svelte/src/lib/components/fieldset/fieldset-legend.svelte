<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldsetLegendBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface FieldsetLegendProps extends Assign<HTMLProps<'div'>, FieldsetLegendBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldsetContext } from './use-fieldset-context'

  let { ref = $bindable(null), ...props }: FieldsetLegendProps = $props()
  const fieldset = useFieldsetContext()
  const mergedProps = $derived(mergeProps(fieldset?.().getLegendProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
