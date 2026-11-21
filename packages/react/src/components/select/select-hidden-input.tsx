'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'

export interface SelectHiddenInputBaseProps extends PolymorphicProps {}
export interface SelectHiddenInputProps extends HTMLProps<'input'>, SelectHiddenInputBaseProps {}

export const SelectHiddenInput = forwardRef<HTMLInputElement, SelectHiddenInputProps>((props, ref) => {
  const select = useSelectContext()
  const { name, form, disabled } = select.getHiddenSelectProps()
  const values = select.value.length > 0 ? select.value : select.multiple ? [] : ['']

  return (
    <>
      {values.map((value, index) => (
        <ark.input
          key={value}
          {...mergeProps({ type: 'hidden', name, form, disabled, value }, props)}
          ref={index === 0 ? ref : undefined}
        />
      ))}
    </>
  )
})

SelectHiddenInput.displayName = 'SelectHiddenInput'
