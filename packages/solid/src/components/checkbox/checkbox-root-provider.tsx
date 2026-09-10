import type { RootState } from '@zag-js/checkbox'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseCheckboxReturn } from './use-checkbox.ts'
import { CheckboxProvider } from './use-checkbox-context.ts'

interface RootProviderProps {
  value: UseCheckboxReturn
}

export interface CheckboxRootProviderState extends RootState {}

export interface CheckboxRootProviderBaseProps extends PolymorphicProps<'label', CheckboxRootProviderState> {}
export interface CheckboxRootProviderProps
  extends HTMLProps<'label'>, RootProviderProps, CheckboxRootProviderBaseProps {}

export const CheckboxRootProvider = (props: CheckboxRootProviderProps) => {
  const [{ value: checkbox }, labelprops] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => checkbox().getRootProps(), labelprops)

  return (
    <CheckboxProvider value={checkbox}>
      <ark.label {...mergedProps} state={checkbox().getRootState()} />
    </CheckboxProvider>
  )
}
