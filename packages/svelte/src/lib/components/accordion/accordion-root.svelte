<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseAccordionProps } from './use-accordion.svelte'

  export interface AccordionRootBaseProps
    extends UseAccordionProps,
      RenderStrategyProps,
      PolymorphicProps<'div'>,
      RefAttribute {}
  export interface AccordionRootProps extends Assign<HTMLProps<'div'>, AccordionRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import {
    RenderStrategyPropsProvider,
    splitRenderStrategyProps,
    type RenderStrategyProps,
  } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { AccordionProvider } from './use-accordion-context'
  import { useAccordion } from './use-accordion.svelte'

  let { ref = $bindable(null), value = $bindable(), ...props }: AccordionRootProps = $props()
  const providedId = $props.id()

  const [renderStrategyProps, accordionProps] = $derived(splitRenderStrategyProps(props))
  const [useAccordionProps, localProps] = $derived(
    createSplitProps<UseAccordionProps>()(accordionProps, [
      'collapsible',
      'defaultValue',
      'disabled',
      'id',
      'ids',
      'multiple',
      'onFocusChange',
      'onValueChange',
      'orientation',
      'value',
    ]),
  )

  const resolvedProps = $derived<UseAccordionProps>({
    ...useAccordionProps,
    id: useAccordionProps.id ?? providedId,
    value,
    onValueChange(details) {
      useAccordionProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const accordion = useAccordion(() => resolvedProps)
  const mergedProps = $derived(mergeProps(accordion().getRootProps(), localProps))

  RenderStrategyPropsProvider(() => renderStrategyProps)
  AccordionProvider(accordion)
</script>

<Ark as="div" bind:ref {...mergedProps} />
