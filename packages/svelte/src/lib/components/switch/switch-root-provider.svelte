<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseSwitchReturn } from './use-switch.svelte'

  export interface SwitchRootProviderBaseProps extends PolymorphicProps<'label'>, RefAttribute {
    value: UseSwitchReturn
  }
  export interface SwitchRootProviderProps extends Assign<HTMLProps<'label'>, SwitchRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { SwitchProvider } from './use-switch-context'

  let { ref = $bindable(null), value, ...props }: SwitchRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  SwitchProvider(value)
</script>

<Ark as="label" bind:ref {...mergedProps} />
