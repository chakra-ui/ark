import { mergeProps } from '@zag-js/solid'
import { type JSX, createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { Collapsible } from '../collapsible'
import type { PolymorphicProps } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

export interface AccordionItemContentBaseProps extends PolymorphicProps<'div'> {}
export interface AccordionItemContentProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    AccordionItemContentBaseProps {}

interface VisibilityProps {
  hidden?: boolean
  'data-state'?: string
}

const splitVisibilityProps = createSplitProps<VisibilityProps>()

export const AccordionItemContent = (props: AccordionItemContentProps) => {
  const accordion = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()

  const itemContentProps = createMemo(() => {
    const contentProps = accordion().getItemContentProps(itemProps)
    const [, ownProps] = splitVisibilityProps(contentProps as VisibilityProps, [
      'hidden',
      'data-state',
    ])
    return ownProps
  })
  const mergedProps = mergeProps(itemContentProps, props)
  return <Collapsible.Content {...mergedProps} />
}
