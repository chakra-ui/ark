import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputControlProps = HTMLArkProps<'div'>

export const TagsInputControl = (props: TagsInputControlProps) => {
  const api = useTagsInputContext()
  const controlProps = mergeProps(() => api().controlProps, props)
  return <ark.div {...controlProps} />
}
