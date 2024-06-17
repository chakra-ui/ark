import { mergeProps } from '@zag-js/react'
import { type LabelHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableLabelBaseProps extends PolymorphicProps {}
export interface EditableLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    EditableLabelBaseProps {}

export const EditableLabel = forwardRef<HTMLLabelElement, EditableLabelProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

EditableLabel.displayName = 'EditableLabel'
