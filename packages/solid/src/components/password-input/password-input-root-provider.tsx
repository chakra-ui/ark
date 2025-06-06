import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PasswordInputProvider, type UsePasswordInputContext } from './use-password-input-context'

export interface PasswordInputRootProviderBaseProps extends PolymorphicProps<'div'> {
  value: UsePasswordInputContext
  children?: JSX.Element
}
export interface PasswordInputRootProviderProps extends HTMLProps<'div'>, PasswordInputRootProviderBaseProps {}

export const PasswordInputRootProvider = (props: PasswordInputRootProviderProps) => {
  const mergedProps = mergeProps(() => props.value().getRootProps(), props)
  return (
    <PasswordInputProvider value={props.value}>
      <ark.div {...mergedProps} />
    </PasswordInputProvider>
  )
}
