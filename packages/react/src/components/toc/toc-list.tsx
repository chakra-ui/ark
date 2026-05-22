import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTocContext } from './use-toc-context'

export interface TocListBaseProps extends PolymorphicProps {}
export interface TocListProps extends HTMLProps<'ul'>, TocListBaseProps {}

export const TocList = forwardRef<HTMLUListElement, TocListProps>((props, ref) => {
  const toc = useTocContext()
  const mergedProps = mergeProps(toc.getListProps(), props)

  return <ark.ul {...mergedProps} ref={ref} />
})

TocList.displayName = 'TocList'
