<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourCloseTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface TourCloseTriggerProps extends HTMLProps<'button'>, TourCloseTriggerBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTourContext } from './use-tour-context.ts'

  let { ref = $bindable(null), ...props }: TourCloseTriggerProps = $props()

  const tour = useTourContext()

  const mergedProps = $derived(mergeProps(tour().getCloseTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
