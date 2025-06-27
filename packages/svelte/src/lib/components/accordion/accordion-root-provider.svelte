<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseAccordionReturn } from './use-accordion.svelte'

  export interface AccordionRootProviderBaseProps extends PolymorphicProps<'div'>, RenderStrategyProps, RefAttribute {
    value: UseAccordionReturn
  }
  export interface AccordionRootProviderProps extends Assign<HTMLProps<'div'>, AccordionRootProviderBaseProps> {}
</script>

<script lang="ts">
  import {
    type RenderStrategyProps,
    RenderStrategyPropsProvider,
    splitRenderStrategyProps,
  } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { AccordionProvider } from './use-accordion-context'

  let { ref = $bindable(null), value, ...props }: AccordionRootProviderProps = $props()

  const [renderStrategyProps, localProps] = $derived(splitRenderStrategyProps(props))
  const mergedProps = $derived(mergeProps(value().getRootProps(), localProps))

  AccordionProvider(value)
  RenderStrategyPropsProvider(() => renderStrategyProps)
</script>

<Ark bind:ref as="div" {...mergedProps} />
