import { useCheckboxContext, type UseCheckboxContext } from './use-checkbox-context'

export interface CheckboxContextProps {
  children: (context: UseCheckboxContext) => React.ReactNode
}

export const CheckboxContext = (props: CheckboxContextProps) => props.children(useCheckboxContext())
