import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldsetContext } from './use-fieldset-context'

export interface FieldsetHelperTextBaseProps extends PolymorphicProps {}
export interface FieldsetHelperTextProps extends HTMLProps<'span'>, FieldsetHelperTextBaseProps {}

export const FieldsetHelperText = forwardRef<HTMLSpanElement, FieldsetHelperTextProps>(
  (props, ref) => {
    const fieldset = useFieldsetContext()
    const mergedProps = mergeProps(fieldset.getHelperTextProps(), props)

    return <ark.span {...mergedProps} ref={ref} />
  },
)

FieldsetHelperText.displayName = 'FieldsetHelperText'
