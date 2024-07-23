import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldsetContext } from './use-fieldset-context'

export interface FieldsetErrorTextBaseProps extends PolymorphicProps {}
export interface FieldsetErrorTextProps extends HTMLProps<'span'>, FieldsetErrorTextBaseProps {}

export const FieldsetErrorText = forwardRef<HTMLSpanElement, FieldsetErrorTextProps>(
  (props, ref) => {
    const fieldset = useFieldsetContext()
    const mergedProps = mergeProps(fieldset.getErrorTextProps(), props)

    return fieldset.invalid ? <ark.span {...mergedProps} ref={ref} /> : null
  },
)

FieldsetErrorText.displayName = 'FieldsetErrorText'
