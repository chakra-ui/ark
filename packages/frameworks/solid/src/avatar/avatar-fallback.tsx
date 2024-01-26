import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './avatar-context'

export interface AvatarFallbackProps extends HTMLArkProps<'span'> {}

export const AvatarFallback: ArkComponent<'span'> = (props: AvatarFallbackProps) => {
  const avatar = useAvatarContext()
  const mergedProps = mergeProps(() => avatar().fallbackProps, props)

  return <ark.span {...mergedProps} />
}
