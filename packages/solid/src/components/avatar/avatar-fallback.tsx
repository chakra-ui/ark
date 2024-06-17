import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarFallbackBaseProps extends PolymorphicProps<'span'> {}
export interface AvatarFallbackProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    AvatarFallbackBaseProps {}

export const AvatarFallback = (props: AvatarFallbackProps) => {
  const context = useAvatarContext()
  const mergedProps = mergeProps(() => context().getFallbackProps(), props)
  return <ark.span {...mergedProps} />
}
