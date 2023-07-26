import { type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { type CheckboxContext } from './checkbox-context'
import { type UseCheckboxProps } from './use-checkbox'

export type CheckboxProps = Assign<
  Omit<HTMLArkProps<'label'>, 'children'> & {
    children: ReactNode | ((pages: CheckboxContext) => ReactNode)
  },
  UseCheckboxProps
>

export const checkboxSplitProps = (props: CheckboxProps) => {
  const [useCheckboxProps, omittedCheckboxProps] = createSplitProps<UseCheckboxProps>()(props, [
    'aria-describedby',
    'aria-label',
    'aria-labelledby',
    'defaultChecked',
    'checked',
    'dir',
    'disabled',
    'focusable',
    'form',
    'getRootNode',
    'id',
    'ids',
    'indeterminate',
    'invalid',
    'name',
    'onChange',
    'readOnly',
    'required',
    'value',
  ])

  return [useCheckboxProps, omittedCheckboxProps]
}
