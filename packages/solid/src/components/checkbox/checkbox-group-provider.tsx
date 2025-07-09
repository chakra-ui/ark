import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { checkboxAnatomy } from './checkbox.anatomy'
import { CheckboxGroupContextProvider, type UseCheckboxGroupContext } from './use-checkbox-group-context'

interface ProviderProps {
  value: UseCheckboxGroupContext
}

export interface CheckboxGroupProviderBaseProps extends ProviderProps, PolymorphicProps<'div'> {}
export interface CheckboxGroupProviderProps extends Assign<HTMLProps<'div'>, CheckboxGroupProviderBaseProps> {}

export const CheckboxGroupProvider = (props: CheckboxGroupProviderProps) => {
  const [localProps, restProps] = createSplitProps<ProviderProps>()(props, ['value'])

  return (
    <CheckboxGroupContextProvider value={localProps.value}>
      <ark.div role="group" {...restProps} {...checkboxAnatomy.build().group.attrs} />
    </CheckboxGroupContextProvider>
  )
}
