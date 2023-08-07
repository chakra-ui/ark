import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputControlProps = ComponentPropsWithoutRef<typeof ark.div>

export const TagsInputControl = forwardRef<HTMLDivElement, TagsInputControlProps>((props, ref) => {
  const { controlProps, hiddenInputProps } = useTagsInputContext()
  const mergedProps = mergeProps(controlProps, props)

  return (
    <>
      <ark.div {...mergedProps} ref={ref}>
        {props.children}
      </ark.div>
      <input {...hiddenInputProps} />
    </>
  )
})

TagsInputControl.displayName = 'TagsInputControl'
