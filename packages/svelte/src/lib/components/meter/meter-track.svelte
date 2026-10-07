<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MeterTrackBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MeterTrackProps extends HTMLProps<'div'>, MeterTrackBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useMeterContext } from './use-meter-context.ts'

  let { ref = $bindable(null), ...props }: MeterTrackProps = $props()
  const meter = useMeterContext()
  const mergedProps = $derived(mergeProps(meter().getTrackProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
