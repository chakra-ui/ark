import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputLabelProps = HTMLArkProps<'label'>

export const TagsInputLabel = forwardRef<HTMLLabelElement, TagsInputLabelProps>((props, ref) => {
  const { labelProps } = useTagsInputContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

TagsInputLabel.displayName = 'TagsInputLabel'
