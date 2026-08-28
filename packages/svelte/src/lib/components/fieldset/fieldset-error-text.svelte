<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldsetErrorTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface FieldsetErrorTextProps extends Assign<HTMLProps<'span'>, FieldsetErrorTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFieldsetContext } from './use-fieldset-context.ts'

  let { ref = $bindable(null), ...props }: FieldsetErrorTextProps = $props()
  const fieldset = useFieldsetContext()
  const mergedProps = $derived(mergeProps(fieldset?.().getErrorTextProps(), props))
</script>

{#if fieldset?.().invalid}
  <Ark as="span" bind:ref {...mergedProps} />
{/if}
