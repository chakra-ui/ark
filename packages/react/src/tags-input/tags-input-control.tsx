import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputControlProps = HTMLArkProps<'div'>

export const TagsInputControl = forwardRef<'div', TagsInputControlProps>((props, ref) => {
  const { controlProps, hiddenInputProps } = useTagsInputContext()
  const mergedProps = mergeProps(controlProps, props)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {props.children}
      <input {...hiddenInputProps} />
    </ark.div>
  )
})
