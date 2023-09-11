import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputLabelProps = HtmlArkProps<'label'>

export const TagsInputLabel = forwardRef<HTMLLabelElement, TagsInputLabelProps>((props, ref) => {
  const { labelProps } = useTagsInputContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

TagsInputLabel.displayName = 'TagsInputLabel'
