import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableCancelButtonProps = HTMLArkProps<'button'>

export const EditableCancelButton = forwardRef<'button', EditableCancelButtonProps>(
  (props, ref) => {
    const { cancelButtonProps } = useEditableContext()
    const mergedProps = mergeProps(cancelButtonProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)
