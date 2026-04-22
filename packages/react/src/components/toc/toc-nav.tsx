import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTocContext } from './use-toc-context'

export interface TocNavBaseProps extends PolymorphicProps {
  placement?: 'left' | 'right'
}
export interface TocNavProps extends HTMLProps<'nav'>, TocNavBaseProps {}

export const TocNav = forwardRef<HTMLElement, TocNavProps>((props, ref) => {
  const { placement, ...rest } = props
  const toc = useTocContext()
  const mergedProps = mergeProps(toc.getRootProps(), rest)

  return <ark.nav {...mergedProps} data-placement={placement} ref={ref} />
})

TocNav.displayName = 'TocNav'
