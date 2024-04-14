import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemInputProps extends HTMLArkProps<'input'> {}

export const TagsInputItemInput = forwardRef<HTMLInputElement, TagsInputItemInputProps>(
  (props, ref) => {
    const tagsInput = useTagsInputContext()
    const itemProps = useTagsInputItemPropsContext()
    const mergedProps = mergeProps(tagsInput.getItemInputProps(itemProps), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

TagsInputItemInput.displayName = 'TagsInputItemInput'
