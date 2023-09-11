import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputControlProps = HTMLArkProps<'div'>

export const TagsInputControl = forwardRef<HTMLDivElement, TagsInputControlProps>((props, ref) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

TagsInputControl.displayName = 'TagsInputControl'
