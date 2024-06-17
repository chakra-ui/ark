import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemTextBaseProps extends PolymorphicProps {}
export interface TagsInputItemTextProps
  extends HTMLAttributes<HTMLSpanElement>,
    TagsInputItemTextBaseProps {}

export const TagsInputItemText = forwardRef<HTMLSpanElement, TagsInputItemTextProps>(
  (props, ref) => {
    const tagsInput = useTagsInputContext()
    const itemProps = useTagsInputItemPropsContext()
    const mergedProps = mergeProps(tagsInput.getItemTextProps(itemProps), props)

    return <ark.span {...mergedProps} ref={ref} />
  },
)

TagsInputItemText.displayName = 'TagsInputItemText'
