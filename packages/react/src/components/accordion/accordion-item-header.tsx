'use client'

import type { ItemState } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useAccordionContext } from './use-accordion-context.ts'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context.ts'

export interface AccordionItemHeaderState extends ItemState {}

export interface AccordionItemHeaderBaseProps extends PolymorphicProps<AccordionItemHeaderState> {}
export interface AccordionItemHeaderProps extends HTMLProps<'h3'>, AccordionItemHeaderBaseProps {}

export const AccordionItemHeader = forwardRef<HTMLHeadingElement, AccordionItemHeaderProps>((props, ref) => {
  const accordion = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  const mergedProps = mergeProps(accordion.getItemHeaderProps(itemProps), props)

  return <ark.h3 {...mergedProps} ref={ref} state={accordion.getItemState(itemProps)} />
})

AccordionItemHeader.displayName = 'AccordionItemHeader'
