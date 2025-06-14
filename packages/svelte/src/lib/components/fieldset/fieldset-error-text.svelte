<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface FieldsetErrorTextBaseProps extends PolymorphicProps<'span'> {}
  export interface FieldsetErrorTextProps extends Assign<HTMLProps<'span'>, FieldsetErrorTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldsetContext } from './use-fieldset-context'

  const props: FieldsetErrorTextProps = $props()
  const fieldset = useFieldsetContext()
  const mergedProps = $derived(mergeProps(fieldset?.().getErrorTextProps(), props))
</script>

<Ark as="span" {...mergedProps} />
