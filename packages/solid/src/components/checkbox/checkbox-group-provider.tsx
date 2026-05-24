import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { checkboxAnatomy } from './checkbox.anatomy.ts'
import { CheckboxGroupContextProvider, type UseCheckboxGroupContext } from './use-checkbox-group-context.tsx'

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
