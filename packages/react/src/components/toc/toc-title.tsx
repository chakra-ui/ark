import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTocContext } from './use-toc-context'

export interface TocTitleBaseProps extends PolymorphicProps {}
export interface TocTitleProps extends HTMLProps<'h2'>, TocTitleBaseProps {}

export const TocTitle = forwardRef<HTMLHeadingElement, TocTitleProps>((props, ref) => {
  const toc = useTocContext()
  const mergedProps = mergeProps(toc.getTitleProps(), props)

  return <ark.h2 {...mergedProps} ref={ref} />
})

TocTitle.displayName = 'TocTitle'
