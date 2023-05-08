import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTagsInputContext } from './tags-input-context'

export type TagProps = {
  index: string | number
  value: string
  disabled?: boolean
}

export const Tag = (props: Assign<HTMLArkProps<'div'>, TagProps>) => {
  const [tagParams, restProps] = createSplitProps<TagProps>()(props, ['index', 'disabled', 'value'])
  const api = useTagsInputContext()
  const tagProps = mergeProps(() => api().getTagProps(tagParams), restProps)
  return <ark.div {...tagProps} />
}
