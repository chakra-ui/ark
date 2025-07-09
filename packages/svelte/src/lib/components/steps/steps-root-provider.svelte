<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseStepsReturn } from './use-steps.svelte'

  export interface StepsRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseStepsReturn
  }
  export interface StepsRootProviderProps extends Assign<HTMLProps<'div'>, StepsRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { StepsProvider } from './use-steps-context'

  let { ref = $bindable(null), value, ...props }: StepsRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  StepsProvider(value)
</script>

<Ark as="div" bind:ref {...mergedProps} />
