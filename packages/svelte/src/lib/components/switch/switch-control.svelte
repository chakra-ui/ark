<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SwitchControlBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface SwitchControlProps extends Assign<HTMLProps<'span'>, SwitchControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSwitchContext } from './use-switch-context'

  let { ref = $bindable(null), ...props }: SwitchControlProps = $props()

  const switchMachine = useSwitchContext()
  const mergedProps = $derived(mergeProps(switchMachine().getControlProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
