<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface FieldErrorTextBaseProps extends PolymorphicProps<'span'> {}
  export interface FieldErrorTextProps extends Assign<HTMLProps<'span'>, FieldErrorTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldContext } from './use-field-context'

  const props: FieldErrorTextProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(field?.().getErrorTextProps() ?? {}, props))
</script>

{#if field?.().invalid}
  <Ark as="span" {...mergedProps} />
{/if}
