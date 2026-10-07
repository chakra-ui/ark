<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseNumberFlowReturn } from './use-number-flow.svelte.ts'

  interface RootProviderProps {
    value: UseNumberFlowReturn
  }

  export interface NumberFlowRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'span'>, RefAttribute {}
  export interface NumberFlowRootProviderProps extends Assign<HTMLProps<'span'>, NumberFlowRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { NumberFlowProvider } from './use-number-flow-context.ts'

  let { ref = $bindable(null), value, ...props }: NumberFlowRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  NumberFlowProvider(() => value())
</script>

<Ark as="span" bind:ref {...mergedProps} />
