<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseMeterReturn } from './use-meter.svelte.ts'

  interface RootProviderProps {
    value: UseMeterReturn
  }

  export interface MeterRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface MeterRootProviderProps extends Assign<HTMLProps<'div'>, MeterRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { MeterProvider } from './use-meter-context.ts'

  let { ref = $bindable(null), value: meter, ...localProps }: MeterRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(meter().getRootProps(), localProps))

  MeterProvider(() => meter())
</script>

<Ark as="div" bind:ref {...mergedProps} />
