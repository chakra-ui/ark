import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTagsInputContext } from './use-tags-input-context.ts'

export interface TagsInputLabelBaseProps extends PolymorphicProps<'label'> {}
export interface TagsInputLabelProps extends HTMLProps<'label'>, TagsInputLabelBaseProps {}

export const TagsInputLabel = (props: TagsInputLabelProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
