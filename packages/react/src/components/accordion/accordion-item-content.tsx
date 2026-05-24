'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { Collapsible } from '../collapsible/index.ts'
import type { HTMLProps, PolymorphicProps } from '../factory.ts'
import { useAccordionContext } from './use-accordion-context.ts'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context.ts'

export interface AccordionItemContentBaseProps extends PolymorphicProps {}
export interface AccordionItemContentProps extends HTMLProps<'div'>, AccordionItemContentBaseProps {}

interface VisibilityProps {
  hidden?: boolean | undefined
  'data-state'?: string | undefined
}

const splitVisibilityProps = createSplitProps<VisibilityProps>()

export const AccordionItemContent = forwardRef<HTMLDivElement, AccordionItemContentProps>((props, ref) => {
  const accordion = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()

  const contentProps = accordion.getItemContentProps(itemProps)
  const [, itemContentProps] = splitVisibilityProps(contentProps, ['hidden', 'data-state'])

  const mergedProps = mergeProps(itemContentProps, props)

  return <Collapsible.Content ref={ref} {...mergedProps} />
})

AccordionItemContent.displayName = 'AccordionItemContent'
