import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputLabelBaseProps extends PolymorphicProps {}
export interface TagsInputLabelProps extends HTMLProps<'label'>, TagsInputLabelBaseProps {}

export const TagsInputLabel = forwardRef<HTMLLabelElement, TagsInputLabelProps>((props, ref) => {
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(tagsInput.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

TagsInputLabel.displayName = 'TagsInputLabel'
