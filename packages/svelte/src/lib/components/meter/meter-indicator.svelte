<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MeterIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MeterIndicatorProps extends HTMLProps<'div'>, MeterIndicatorBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useMeterContext } from './use-meter-context.ts'

  let { ref = $bindable(null), ...props }: MeterIndicatorProps = $props()
  const meter = useMeterContext()
  const mergedProps = $derived(mergeProps(meter().getIndicatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
