import { mergeProps } from '@zag-js/solid'
import { type JSX, Show, splitProps } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePasswordInputContext } from './use-password-input-context'

export interface PasswordInputIndicatorBaseProps extends PolymorphicProps<'span'> {
  /**
   * The fallback content to display when the password is not visible.
   */
  fallback?: JSX.Element
}
export interface PasswordInputIndicatorProps extends HTMLProps<'span'>, PasswordInputIndicatorBaseProps {}

export const PasswordInputIndicator = (props: PasswordInputIndicatorProps) => {
  const passwordInput = usePasswordInputContext()
  const [local, rest] = splitProps(props, ['fallback', 'children'])
  const mergedProps = mergeProps(() => passwordInput().getIndicatorProps(), rest)

  return (
    <ark.span {...mergedProps}>
      <Show when={passwordInput().visible} fallback={local.fallback}>
        {local.children}
      </Show>
    </ark.span>
  )
}
