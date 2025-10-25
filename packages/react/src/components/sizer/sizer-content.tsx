import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { parts } from './sizer.anatomy'
import { useSizerContext } from './use-sizer-context'

export interface SizerContentBaseProps extends PolymorphicProps {}
export interface SizerContentProps extends HTMLProps<'div'>, SizerContentBaseProps {}

export const SizerContent = forwardRef<HTMLDivElement, SizerContentProps>((props, ref) => {
  const sizer = useSizerContext()

  return <ark.div {...props} {...parts.content} ref={composeRefs(sizer.contentRef, ref)} />
})

SizerContent.displayName = 'SizerContent'
