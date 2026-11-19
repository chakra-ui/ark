import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTocContext } from './use-toc-context.ts'
import { useTocItemPropsContext } from './use-toc-item-props-context.ts'

export interface TocLinkBaseProps extends PolymorphicProps {}
export interface TocLinkProps extends HTMLProps<'a'>, TocLinkBaseProps {}

export const TocLink = forwardRef<HTMLAnchorElement, TocLinkProps>((props, ref) => {
  const toc = useTocContext()
  const itemProps = useTocItemPropsContext()
  const mergedProps = mergeProps(toc.getLinkProps(itemProps), props)

  return <ark.a {...mergedProps} ref={ref} />
})

TocLink.displayName = 'TocLink'
