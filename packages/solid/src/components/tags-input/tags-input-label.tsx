import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputLabelBaseProps extends PolymorphicProps<'label'> {}
export interface TagsInputLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    TagsInputLabelBaseProps {}

export const TagsInputLabel = (props: TagsInputLabelProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
