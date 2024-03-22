import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarFallbackProps extends HTMLArkProps<'span'> {}

export const AvatarFallback: ArkComponent<'span'> = (props: AvatarFallbackProps) => {
  const context = useAvatarContext()
  const mergedProps = mergeProps(() => context().fallbackProps, props)

  return <ark.span {...mergedProps} />
}
