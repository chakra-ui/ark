import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectValueTextBaseProps extends PolymorphicProps {
  /**
   * Text to display when no value is selected.
   */
  placeholder?: string | undefined
}
export interface CascadeSelectValueTextProps extends HTMLProps<'span'>, CascadeSelectValueTextBaseProps {}

export const CascadeSelectValueText = forwardRef<HTMLSpanElement, CascadeSelectValueTextProps>((props, ref) => {
  const { children, placeholder, ...localProps } = props
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = mergeProps(cascadeSelect.getValueTextProps(), localProps)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {children || cascadeSelect.valueAsString || placeholder}
    </ark.span>
  )
})

CascadeSelectValueText.displayName = 'CascadeSelectValueText'
