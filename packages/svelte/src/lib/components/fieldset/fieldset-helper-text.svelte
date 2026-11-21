<script module lang="ts">
  import type { RootState } from '@zag-js/fieldset'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldsetHelperTextState extends RootState {}
  export interface FieldsetHelperTextBaseProps
    extends PolymorphicProps<'span', FieldsetHelperTextState>, RefAttribute {}
  export interface FieldsetHelperTextProps extends Assign<HTMLProps<'span'>, FieldsetHelperTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFieldsetContext } from './use-fieldset-context.ts'

  let { ref = $bindable(null), ...props }: FieldsetHelperTextProps = $props()
  const fieldset = useFieldsetContext()
  const mergedProps = $derived(mergeProps(fieldset?.().getHelperTextProps() ?? {}, props))
</script>

<Ark as="span" bind:ref {...mergedProps} state={fieldset?.().getRootState()} />
