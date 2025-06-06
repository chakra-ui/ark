import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UsePasswordInputProps, usePasswordInput } from './use-password-input'
import { PasswordInputProvider } from './use-password-input-context'

export interface PasswordInputRootBaseProps extends UsePasswordInputProps, PolymorphicProps<'div'> {}
export interface PasswordInputRootProps extends HTMLProps<'div'>, PasswordInputRootBaseProps {}

export const PasswordInputRoot = (props: PasswordInputRootProps) => {
  const [usePasswordInputProps, localProps] = createSplitProps<UsePasswordInputProps>()(props, [
    'autoComplete',
    'defaultVisible',
    'disabled',
    'id',
    'ids',
    'ignorePasswordManagers',
    'invalid',
    'name',
    'onVisibilityChange',
    'readOnly',
    'required',
    'translations',
    'visible',
  ])
  const passwordInput = usePasswordInput(usePasswordInputProps)
  const mergedProps = mergeProps(() => passwordInput().getRootProps(), localProps)

  return (
    <PasswordInputProvider value={passwordInput}>
      <ark.div {...mergedProps} />
    </PasswordInputProvider>
  )
}
