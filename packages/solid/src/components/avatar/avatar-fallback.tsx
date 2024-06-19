import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarFallbackBaseProps extends PolymorphicProps<'span'> {}
export interface AvatarFallbackProps extends HTMLProps<'span'>, AvatarFallbackBaseProps {}

export const AvatarFallback = (props: AvatarFallbackProps) => {
  const context = useAvatarContext()
  const mergedProps = mergeProps(() => context().getFallbackProps(), props)
  return <ark.span {...mergedProps} />
}
