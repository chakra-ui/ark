<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseMarqueeProps } from './use-marquee.svelte'

  export interface MarqueeRootBaseProps extends Optional<UseMarqueeProps, 'id'>, PolymorphicProps<'div'>, RefAttribute {}
  export interface MarqueeRootProps extends Assign<HTMLProps<'div'>, MarqueeRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { MarqueeProvider } from './use-marquee-context'
  import { useMarquee } from './use-marquee.svelte'

  let { ref = $bindable(null), ...props }: MarqueeRootProps = $props()
  const providedId = $props.id()

  const [useMarqueeProps, localProps] = $derived(
    createSplitProps<Optional<UseMarqueeProps, 'id'>>()(props, [
      'autoFill',
      'defaultPaused',
      'delay',
      'id',
      'ids',
      'loopCount',
      'onComplete',
      'onLoopComplete',
      'onPauseChange',
      'paused',
      'pauseOnInteraction',
      'reverse',
      'side',
      'spacing',
      'speed',
      'translations',
    ]),
  )

  const resolvedProps = $derived({
    ...useMarqueeProps,
    id: providedId,
  })

  const marquee = useMarquee(() => resolvedProps)
  const mergedProps = $derived(mergeProps(marquee().getRootProps(), localProps))

  MarqueeProvider(marquee)
</script>

<Ark as="div" bind:ref {...mergedProps} />
