import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { PresencePropsProvider, splitPresenceProps, type UsePresenceProps } from '../presence'
import type { Assign } from '../types'
import { AccordionProvider } from './accordion-context'
import { useAccordion, type UseAccordionProps } from './use-accordion'

interface ElementProps extends UseAccordionProps, UsePresenceProps {}
export interface AccordionRootProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const AccordionRoot: ArkComponent<'div', ElementProps> = (props: AccordionRootProps) => {
  const [presenceProps, accordionProps] = splitPresenceProps(props)
  const [useAccordionProps, localProps] = createSplitProps<UseAccordionProps>()(accordionProps, [
    'collapsible',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'multiple',
    'onFocusChange',
    'onValueChange',
    'orientation',
    'value',
  ])
  const api = useAccordion(useAccordionProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <AccordionProvider value={api}>
      <PresencePropsProvider value={presenceProps}>
        <ark.div {...mergedProps} />
      </PresencePropsProvider>
    </AccordionProvider>
  )
}
