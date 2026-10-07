<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MeterLabelBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface MeterLabelProps extends HTMLProps<'span'>, MeterLabelBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useMeterContext } from './use-meter-context.ts'

  let { ref = $bindable(null), ...props }: MeterLabelProps = $props()
  const meter = useMeterContext()
  const mergedProps = $derived(mergeProps(meter().getLabelProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
