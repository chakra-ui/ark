import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableLabelProps extends HTMLArkProps<'label'> {}

export const EditableLabel = forwardRef<HTMLLabelElement, EditableLabelProps>((props, ref) => {
  const context = useEditableContext()
  const mergedProps = mergeProps(context.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

EditableLabel.displayName = 'EditableLabel'
