import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableLabelProps extends HTMLArkProps<'label'> {}

export const EditableLabel = forwardRef<HTMLLabelElement, EditableLabelProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

EditableLabel.displayName = 'EditableLabel'
