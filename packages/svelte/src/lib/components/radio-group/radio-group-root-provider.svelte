<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseRadioGroupReturn } from './use-radio-group.svelte'

  interface RootProviderProps {
    value: UseRadioGroupReturn
  }

  export interface RadioGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface RadioGroupRootProviderProps extends Assign<HTMLProps<'div'>, RadioGroupRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { RadioGroupProvider } from './use-radio-group-context'

  let { ref = $bindable(), value, ...props }: RadioGroupRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  RadioGroupProvider(value)
</script>

<Ark as="div" bind:ref {...mergedProps} />
