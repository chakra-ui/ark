import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputControlProps extends HTMLArkProps<'div'> {}

export const TagsInputControl = (props: TagsInputControlProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return <ark.div {...mergedProps()} />
}
