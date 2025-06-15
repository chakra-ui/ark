<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface NumberInputInputBaseProps extends PolymorphicProps<'input'> {}
  export interface NumberInputInputProps extends Assign<HTMLProps<'input'>, NumberInputInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldContext } from '../field'
  import { useNumberInputContext } from './use-number-input-context'

  const props: NumberInputInputProps = $props()

  const numberInput = useNumberInputContext()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(numberInput().getInputProps(), props))
</script>

<Ark as="input" aria-describedby={field?.()?.ariaDescribedby} {...mergedProps} />
