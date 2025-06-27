<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CheckboxHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface CheckboxHiddenInputProps extends Assign<HTMLProps<'input'>, CheckboxHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldContext } from '../field'
  import { useCheckboxContext } from './use-checkbox-context'

  let { ref = $bindable(), ...props }: CheckboxHiddenInputProps = $props()

  const checkbox = useCheckboxContext()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(checkbox().getHiddenInputProps(), props))
</script>

<Ark as="input" bind:ref aria-describedby={field?.()?.ariaDescribedby} {...mergedProps} />
