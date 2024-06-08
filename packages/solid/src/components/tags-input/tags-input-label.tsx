import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputLabelProps extends HTMLArkProps<'label'> {}

export const TagsInputLabel = (props: TagsInputLabelProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
