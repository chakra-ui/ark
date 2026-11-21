<script module lang="ts">
  import type { IndicatorProps, IndicatorState } from '@zag-js/field'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldIndicatorState extends IndicatorState {}
  export interface FieldIndicatorBaseProps
    extends IndicatorProps, PolymorphicProps<'span', FieldIndicatorState>, RefAttribute {}
  export interface FieldIndicatorProps extends Assign<HTMLProps<'span'>, FieldIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFieldContext } from './use-field-context.ts'

  let { ref = $bindable(null), type, ...props }: FieldIndicatorProps = $props()
  const field = useFieldContext()
  const indicatorProps = $derived({ type })
  const mergedProps = $derived(mergeProps(field?.()?.getIndicatorProps(indicatorProps) ?? {}, props))
</script>

<Ark as="span" bind:ref {...mergedProps} state={field?.()?.getIndicatorState(indicatorProps)} />
