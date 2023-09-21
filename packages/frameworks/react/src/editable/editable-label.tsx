import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableLabelProps extends HTMLArkProps<'label'> {}

export const EditableLabel = forwardRef<HTMLLabelElement, EditableLabelProps>((props, ref) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(api.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

EditableLabel.displayName = 'EditableLabel'
