import { mergeProps } from '@zag-js/core'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from './use-field-context'

export interface FieldRequiredIndicatorBaseProps extends PolymorphicProps {
  fallback?: React.ReactNode
}
export interface FieldRequiredIndicatorProps
  extends HTMLProps<'span'>,
    FieldRequiredIndicatorBaseProps {}

export const FieldRequiredIndicator = forwardRef<HTMLSpanElement, FieldRequiredIndicatorProps>(
  ({ fallback, ...props }, ref) => {
    const field = useFieldContext()

    if (!field.required) {
      return fallback
    }

    const mergedProps = mergeProps(field.getRequiredIndicatorProps(), props)
    return (
      <ark.span {...mergedProps} ref={ref}>
        {props.children ?? '*'}
      </ark.span>
    )
  },
)

FieldRequiredIndicator.displayName = 'FieldRequiredIndicator'
