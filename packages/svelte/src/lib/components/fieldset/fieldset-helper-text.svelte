<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface FieldsetHelperTextBaseProps extends PolymorphicProps<'span'> {}
  export interface FieldsetHelperTextProps extends Assign<HTMLProps<'span'>, FieldsetHelperTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldsetContext } from './use-fieldset-context'

  const props: FieldsetHelperTextProps = $props()
  const fieldset = useFieldsetContext()
  const mergedProps = $derived(mergeProps(fieldset?.().getHelperTextProps(), props))
</script>

<Ark as="span" {...mergedProps} />
