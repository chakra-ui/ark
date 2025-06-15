<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseNumberInputProps } from './use-number-input.svelte'

  export interface NumberInputRootBaseProps extends UseNumberInputProps, PolymorphicProps<'div'> {}
  export interface NumberInputRootProps extends Assign<HTMLProps<'div'>, NumberInputRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { NumberInputProvider } from './use-number-input-context'
  import { splitNumberInputProps } from './split-number-input-props.svelte'
  import { useNumberInput } from './use-number-input.svelte'

  let { value = $bindable(), ...props }: NumberInputRootProps = $props()
  const providedId = $props.id()

  const [useNumberInputProps, localProps] = $derived(splitNumberInputProps(props))

  const resolvedProps = $derived<UseNumberInputProps>({
    ...useNumberInputProps,
    id: useNumberInputProps.id ?? providedId,
    value,
    onValueChange(details) {
      useNumberInputProps.onValueChange?.(details)
      value = details.value
    },
  })

  const numberInput = useNumberInput(() => resolvedProps)
  const mergedProps = $derived(mergeProps(numberInput().getRootProps(), localProps))

  NumberInputProvider(numberInput)
</script>

<Ark as="div" {...mergedProps} />
