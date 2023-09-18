import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputLabelProps = HTMLArkProps<'label'>

export const TagsInputLabel = (props: TagsInputLabelProps) => {
  const api = useTagsInputContext()
  const labelProps = mergeProps(() => api().labelProps, props)
  return <ark.label {...labelProps} />
}
