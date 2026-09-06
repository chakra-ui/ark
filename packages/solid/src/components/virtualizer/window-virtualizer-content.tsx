import { mergeProps, normalizeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useWindowVirtualizerContext } from './use-window-virtualizer-context.ts'

export interface WindowVirtualizerContentBaseProps extends PolymorphicProps<'div'> {}
export interface WindowVirtualizerContentProps extends Assign<HTMLProps<'div'>, WindowVirtualizerContentBaseProps> {}

export const WindowVirtualizerContent = (props: WindowVirtualizerContentProps) => {
  const virtualizer = useWindowVirtualizerContext()
  const mergedProps = mergeProps(() => ({ style: normalizeProps.style(virtualizer.getContentStyle()) }), props)

  return <ark.div {...mergedProps} />
}
