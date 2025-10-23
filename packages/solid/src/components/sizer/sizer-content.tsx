import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { parts } from './sizer.anatomy'
import { useSizerContext } from './use-sizer-context'

export interface SizerContentBaseProps extends PolymorphicProps<'div'> {}
export interface SizerContentProps extends HTMLProps<'div'>, SizerContentBaseProps {}

export const SizerContent = (props: SizerContentProps) => {
  const sizer = useSizerContext()
  return <ark.div {...parts.content} {...props} ref={composeRefs(sizer().contentRef, props.ref)} />
}
