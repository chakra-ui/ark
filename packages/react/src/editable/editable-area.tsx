import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useEditableContext } from './editable-context'

export type EditableAreaProps = HTMLArkProps<'div'>

export const EditableArea = forwardRef<'div'>((props, ref) => {
  const { areaProps } = useEditableContext()
  const mergedProps = mergeProps(areaProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
