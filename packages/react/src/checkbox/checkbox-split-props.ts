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
  return createSplitProps<UseCheckboxProps>()(props, [
    'checked',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
    'ids',
    'invalid',
    'name',
    'onChange',
    'required',
    'value',
  ])
}
