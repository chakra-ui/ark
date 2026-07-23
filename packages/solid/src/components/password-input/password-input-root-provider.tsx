import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UsePasswordInputReturn } from './use-password-input.ts'
import { PasswordInputProvider } from './use-password-input-context.ts'

interface RootProviderProps {
  value: UsePasswordInputReturn
}

export interface PasswordInputRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface PasswordInputRootProviderProps
  extends HTMLProps<'div'>, RootProviderProps, PasswordInputRootProviderBaseProps {}

export const PasswordInputRootProvider = (props: PasswordInputRootProviderProps) => {
  const [{ value: passwordInput }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => passwordInput().getRootProps(), localProps)

  return (
    <PasswordInputProvider value={passwordInput}>
      <ark.div {...mergedProps} />
    </PasswordInputProvider>
  )
}
