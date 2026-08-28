import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { Collapsible } from '../collapsible/index.tsx'
import type { HTMLProps, PolymorphicProps } from '../factory.tsx'
import { useAccordionContext } from './use-accordion-context.ts'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context.ts'

export interface AccordionItemContentBaseProps extends PolymorphicProps<'div'> {}
export interface AccordionItemContentProps extends HTMLProps<'div'>, AccordionItemContentBaseProps {}

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
    const [, ownProps] = splitVisibilityProps(contentProps as VisibilityProps, ['hidden', 'data-state'])
    return ownProps
  })
  const mergedProps = mergeProps(() => itemContentProps(), props)

  return <Collapsible.Content {...mergedProps} />
}
