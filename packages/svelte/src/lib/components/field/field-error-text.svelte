<script module lang="ts">
  import type { ErrorTextProps, ErrorTextState } from '@zag-js/field'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldErrorTextState extends ErrorTextState {}
  export interface FieldErrorTextBaseProps
    extends ErrorTextProps, PolymorphicProps<'span', FieldErrorTextState>, RefAttribute {}
  export interface FieldErrorTextProps extends Assign<HTMLProps<'span'>, FieldErrorTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFieldContext } from './use-field-context.ts'

  let { ref = $bindable(null), match, id, ...props }: FieldErrorTextProps = $props()
  const field = useFieldContext()
  const errorTextProps = $derived({ match, id })
  const mergedProps = $derived(mergeProps(field?.()?.getErrorTextProps(errorTextProps) ?? {}, props))
</script>

<Ark as="span" bind:ref {...mergedProps} state={field?.()?.getErrorTextState(errorTextProps)} />
