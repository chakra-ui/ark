import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export interface TagsInputLabelProps extends HTMLArkProps<'label'> {}

export const TagsInputLabel = forwardRef<HTMLLabelElement, TagsInputLabelProps>((props, ref) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(api.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

TagsInputLabel.displayName = 'TagsInputLabel'
