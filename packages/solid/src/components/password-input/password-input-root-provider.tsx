import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UsePasswordInputReturn } from './use-password-input.ts'
import { PasswordInputProvider } from './use-password-input-context.ts'
import type { RootState } from '@zag-js/password-input'

interface RootProviderProps {
  value: UsePasswordInputReturn
}

export interface PasswordInputRootProviderState extends RootState {}

export interface PasswordInputRootProviderBaseProps extends PolymorphicProps<'div', PasswordInputRootProviderState> {}
export interface PasswordInputRootProviderProps
  extends HTMLProps<'div'>, RootProviderProps, PasswordInputRootProviderBaseProps {}

export const PasswordInputRootProvider = (props: PasswordInputRootProviderProps) => {
  const [{ value: passwordInput }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => passwordInput().getRootProps(), localProps)

  return (
    <PasswordInputProvider value={passwordInput}>
      <ark.div {...mergedProps} state={passwordInput().getRootState()} />
    </PasswordInputProvider>
  )
}
