<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TourArrowTipBaseProps extends PolymorphicProps<'div'> {}
  export interface TourArrowTipProps extends HTMLProps<'div'>, TourArrowTipBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTourContext } from './use-tour-context'

  const props: TourArrowTipProps = $props()

  const tour = useTourContext()
  const mergedProps = $derived(mergeProps(tour().getArrowTipProps(), props))
</script>

<Ark as="div" {...mergedProps} />
