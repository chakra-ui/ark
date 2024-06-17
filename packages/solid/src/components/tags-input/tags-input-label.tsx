import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputLabelBaseProps extends PolymorphicProps<'label'> {}
export interface TagsInputLabelProps extends HTMLProps<'label'>, TagsInputLabelBaseProps {}

export const TagsInputLabel = (props: TagsInputLabelProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
