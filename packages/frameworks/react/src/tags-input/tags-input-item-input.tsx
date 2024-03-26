import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemContext } from './use-tags-input-item-context'

export interface TagsInputItemInputProps extends HTMLArkProps<'input'> {}

export const TagsInputItemInput = forwardRef<HTMLInputElement, TagsInputItemInputProps>(
  (props, ref) => {
    const context = useTagsInputContext()
    const itemContext = useTagsInputItemContext()
    const mergedProps = mergeProps(context.getItemInputProps(itemContext), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

TagsInputItemInput.displayName = 'TagsInputItemInput'
