'use client'

import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { checkboxAnatomy } from './checkbox.anatomy.ts'
import { CheckboxGroupContextProvider, type UseCheckboxGroupContext } from './use-checkbox-group-context.tsx'

interface ProviderProps {
  value: UseCheckboxGroupContext
}

export interface CheckboxGroupProviderBaseProps extends ProviderProps, PolymorphicProps {}
export interface CheckboxGroupProviderProps extends Assign<HTMLProps<'div'>, CheckboxGroupProviderBaseProps> {}

const splitProviderProps = createSplitProps<ProviderProps>()

export const CheckboxGroupProvider = forwardRef<HTMLDivElement, CheckboxGroupProviderProps>((props, ref) => {
  const [localProps, restProps] = splitProviderProps(props, ['value'])

  return (
    <CheckboxGroupContextProvider value={localProps.value}>
      <ark.div ref={ref} role="group" {...restProps} {...checkboxAnatomy.build().group.attrs} />
    </CheckboxGroupContextProvider>
  )
})

CheckboxGroupProvider.displayName = 'CheckboxGroupProvider'
