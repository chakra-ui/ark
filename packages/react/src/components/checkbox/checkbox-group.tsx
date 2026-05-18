'use client'

import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { checkboxAnatomy } from './checkbox.anatomy.ts'
import { type UseCheckboxGroupProps, useCheckboxGroup } from './use-checkbox-group.ts'
import { CheckboxGroupContextProvider } from './use-checkbox-group-context.tsx'

export interface CheckboxGroupBaseProps extends UseCheckboxGroupProps, PolymorphicProps {}
export interface CheckboxGroupProps extends Assign<HTMLProps<'div'>, CheckboxGroupBaseProps> {}

const splitGroupProps = createSplitProps<UseCheckboxGroupProps>()

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {
  const [checkboxGroupProps, localProps] = splitGroupProps(props, [
    'defaultValue',
    'value',
    'onValueChange',
    'disabled',
    'invalid',
    'readOnly',
    'name',
    'maxSelectedValues',
  ])

  const checkboxGroup = useCheckboxGroup(checkboxGroupProps)

  return (
    <CheckboxGroupContextProvider value={checkboxGroup}>
      <ark.div ref={ref} role="group" {...localProps} {...checkboxAnatomy.build().group.attrs} />
    </CheckboxGroupContextProvider>
  )
})

CheckboxGroup.displayName = 'CheckboxGroup'
