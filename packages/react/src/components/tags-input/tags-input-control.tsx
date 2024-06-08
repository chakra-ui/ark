import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputControlProps extends HTMLArkProps<'div'> {}

export const TagsInputControl = forwardRef<HTMLDivElement, TagsInputControlProps>((props, ref) => {
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(tagsInput.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TagsInputControl.displayName = 'TagsInputControl'
