import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { TagsInputProvider } from './tags-input-context'
import { useTagsInput, type UseTagsInputProps, type UseTagsInputReturn } from './use-tags-input'

export interface TagsInputRootProps
  extends Assign<
    Assign<
      HTMLArkProps<'div'>,
      {
        children?: ReactNode | ((api: UseTagsInputReturn) => ReactNode)
      }
    >,
    UseTagsInputProps
  > {}

export const TagsInputRoot = forwardRef<HTMLInputElement, TagsInputRootProps>((props, ref) => {
  const [useTagsInputProps, { children, ...inputProps }] = createSplitProps<UseTagsInputProps>()(
    props,
    [
      'addOnPaste',
      'allowEditTag',
      'allowOverflow',
      'autoFocus',
      'blurBehavior',
      'defaultValue',
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
    ],
  )
  const api = useTagsInput(useTagsInputProps)
  const mergedProps = mergeProps(api.rootProps, inputProps)
  const view = runIfFn(children, api)

  return (
    <TagsInputProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
      <input {...api.hiddenInputProps} />
    </TagsInputProvider>
  )
})

TagsInputRoot.displayName = 'TagsInputRoot'
