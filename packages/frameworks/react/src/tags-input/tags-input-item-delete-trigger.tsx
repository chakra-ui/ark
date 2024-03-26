import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemContext } from './use-tags-input-item-context'

export interface TagsInputItemDeleteTriggerProps extends HTMLArkProps<'button'> {}

export const TagsInputItemDeleteTrigger = forwardRef<
  HTMLButtonElement,
  TagsInputItemDeleteTriggerProps
>((props, ref) => {
  const context = useTagsInputContext()
  const itemContext = useTagsInputItemContext()
  const mergedProps = mergeProps(context.getItemDeleteTriggerProps(itemContext), props)

  return <ark.button {...mergedProps} ref={ref} />
})

TagsInputItemDeleteTrigger.displayName = 'TagsInputItemDeleteTrigger'
