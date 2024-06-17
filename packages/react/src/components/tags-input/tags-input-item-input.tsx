import { mergeProps } from '@zag-js/react'
import { type InputHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemInputBaseProps extends PolymorphicProps {}
export interface TagsInputItemInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    TagsInputItemInputBaseProps {}

export const TagsInputItemInput = forwardRef<HTMLInputElement, TagsInputItemInputProps>(
  (props, ref) => {
    const tagsInput = useTagsInputContext()
    const itemProps = useTagsInputItemPropsContext()
    const mergedProps = mergeProps(tagsInput.getItemInputProps(itemProps), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

TagsInputItemInput.displayName = 'TagsInputItemInput'
