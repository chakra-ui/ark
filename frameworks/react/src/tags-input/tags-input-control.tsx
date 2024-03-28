import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputControlProps extends HTMLArkProps<'div'> {}

export const TagsInputControl = forwardRef<HTMLDivElement, TagsInputControlProps>((props, ref) => {
  const context = useTagsInputContext()
  const mergedProps = mergeProps(context.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

TagsInputControl.displayName = 'TagsInputControl'
