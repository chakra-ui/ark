import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputControlProps extends HTMLArkProps<'div'> {}

export const TagsInputControl = (props: TagsInputControlProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
