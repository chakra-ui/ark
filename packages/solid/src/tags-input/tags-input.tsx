import { type Assign } from '@polymorphic-factory/solid'
import { children } from 'solid-js'
import { type JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { TagsInputProvider } from './tags-input-context'
import { useTagsInput, type UseTagsInputProps, type UseTagsInputReturn } from './use-tags-input'

export type TagsInputChildren = {
  children: (pages: ReturnType<UseTagsInputReturn>) => JSX.Element | JSX.Element
}
export type TagsInputProps = Assign<
  Assign<HTMLArkProps<'div'>, UseTagsInputProps>,
  TagsInputChildren
>

export const TagsInput = (props: TagsInputProps) => {
  const [useTagsInputProps, divProps] = createSplitProps<UseTagsInputProps>()(props, [
    'addOnPaste',
    'allowEditTag',
    'allowOverflow',
    'autoFocus',
    'blurBehavior',
    'delimiter',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
    'ids',
    'inputValue',
    'invalid',
    'max',
    'maxLength',
    'name',
    'onChange',
    'onHighlight',
    'onInvalid',
    'onTagUpdate',
    'readOnly',
    'translations',
    'validate',
    'value',
  ])
  const tagsInput = useTagsInput(useTagsInputProps)
  const view = () => children(() => runIfFn(divProps.children, tagsInput()))

  return (
    <TagsInputProvider value={tagsInput}>
      <ark.div {...tagsInput().rootProps} {...divProps}>
        {view}
      </ark.div>
    </TagsInputProvider>
  )
}
