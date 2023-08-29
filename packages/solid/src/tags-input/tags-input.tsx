import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { TagsInputProvider } from './tags-input-context'
import { useTagsInput, type UseTagsInputProps, type UseTagsInputReturn } from './use-tags-input'

export type TagsInputChildren = {
  children: (pages: UseTagsInputReturn) => JSX.Element | JSX.Element
}

export type TagsInputProps = Assign<HTMLArkProps<'div'>, UseTagsInputProps & TagsInputChildren>

export const TagsInput = (props: TagsInputProps) => {
  const [tagsInputParams, restProps] = createSplitProps<UseTagsInputProps>()(props, [
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
    'onFocusChange',
    'onFocusOutside',
    'onInteractOutside',
    'onInvalid',
    'onInvalid',
    'onPointerDownOutside',
    'readOnly',
    'translations',
    'validate',
    'value',
  ])

  const api = useTagsInput(tagsInputParams)
  const rootProps = mergeProps(() => api().rootProps, restProps)

  const getChildren = () => runIfFn(restProps.children, api)

  return (
    <TagsInputProvider value={api}>
      <ark.div {...rootProps}>{getChildren()}</ark.div>
    </TagsInputProvider>
  )
}
