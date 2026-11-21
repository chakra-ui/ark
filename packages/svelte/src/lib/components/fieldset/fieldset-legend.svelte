<script module lang="ts">
  import type { RootState } from '@zag-js/fieldset'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldsetLegendState extends RootState {}
  export interface FieldsetLegendBaseProps extends PolymorphicProps<'legend', FieldsetLegendState>, RefAttribute {}
  export interface FieldsetLegendProps extends Assign<HTMLProps<'legend'>, FieldsetLegendBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFieldsetContext } from './use-fieldset-context.ts'

  let { ref = $bindable(null), ...props }: FieldsetLegendProps = $props()
  const fieldset = useFieldsetContext()
  const mergedProps = $derived(mergeProps(fieldset?.().getLegendProps() ?? {}, props))
</script>

<Ark as="legend" bind:ref {...mergedProps} state={fieldset?.().getRootState()} />
