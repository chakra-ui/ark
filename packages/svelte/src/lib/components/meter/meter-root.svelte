<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseMeterProps } from './use-meter.svelte.ts'

  export interface MeterRootBaseProps extends Optional<UseMeterProps, 'id'>, PolymorphicProps<'div'>, RefAttribute {}
  export interface MeterRootProps extends Assign<HTMLProps<'div'>, MeterRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { Ark } from '../factory/index.ts'
  import { MeterProvider } from './use-meter-context.ts'
  import { useMeter } from './use-meter.svelte.ts'

  let { ref = $bindable(null), value = $bindable(), ...props }: MeterRootProps = $props()
  const providedId = $props.id()

  const [useMeterProps, localProps] = $derived(
    createSplitProps<Optional<UseMeterProps, 'id'>>()(props, [
      'defaultValue',
      'formatOptions',
      'high',
      'id',
      'ids',
      'locale',
      'low',
      'max',
      'min',
      'onValueChange',
      'optimum',
      'orientation',
      'translations',
      'value',
    ]),
  )
  const resolvedProps = $derived<UseMeterProps>({
    ...useMeterProps,
    id: useMeterProps.id ?? providedId,
    value,
    onValueChange(details) {
      useMeterProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const meter = useMeter(() => resolvedProps)
  const mergedProps = $derived(mergeProps(meter().getRootProps(), localProps))

  MeterProvider(meter)
</script>

<Ark as="div" bind:ref {...mergedProps} />
