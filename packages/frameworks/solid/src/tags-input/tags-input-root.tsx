import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { TagsInputProvider } from './tags-input-context'
import { useTagsInput, type UseTagsInputProps, type UseTagsInputReturn } from './use-tags-input'

interface ElementProps extends UseTagsInputProps {
  children?: JSX.Element | ((api: UseTagsInputReturn) => JSX.Element)
}

export interface TagsInputRootProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const TagsInputRoot: ArkComponent<'div', ElementProps> = (props: TagsInputRootProps) => {
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
    'onFocusOutside',
    'onHighlightChange',
    'onInteractOutside',
    'onPointerDownOutside',
    'onValueChange',
    'onValueInvalid',
    'readOnly',
    'translations',
    'validate',
    'value',
  ])

  const api = useTagsInput(tagsInputParams)
  const mergedProps = mergeProps(() => api().rootProps, restProps)
  const getChildren = () => runIfFn(restProps.children, api)

  return (
    <TagsInputProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
      <input {...api().hiddenInputProps} />
    </TagsInputProvider>
  )
}
