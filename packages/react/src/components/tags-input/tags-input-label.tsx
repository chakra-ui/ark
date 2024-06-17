import { mergeProps } from '@zag-js/react'
import { type LabelHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputLabelBaseProps extends PolymorphicProps {}
export interface TagsInputLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    TagsInputLabelBaseProps {}

export const TagsInputLabel = forwardRef<HTMLLabelElement, TagsInputLabelProps>((props, ref) => {
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(tagsInput.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

TagsInputLabel.displayName = 'TagsInputLabel'
