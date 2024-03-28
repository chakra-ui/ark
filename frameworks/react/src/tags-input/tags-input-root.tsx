import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useTagsInput, type UseTagsInputProps } from './use-tags-input'
import { TagsInputProvider } from './use-tags-input-context'

export interface TagsInputRootProps extends Assign<HTMLArkProps<'div'>, UseTagsInputProps> {}

export const TagsInputRoot = forwardRef<HTMLInputElement, TagsInputRootProps>((props, ref) => {
  const [useTagsInputProps, localProps] = createSplitProps<UseTagsInputProps>()(props, [
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
  ])
  const context = useTagsInput(useTagsInputProps)
  const mergedProps = mergeProps(context.rootProps, localProps)

  return (
    <TagsInputProvider value={context}>
      <ark.div {...mergedProps} ref={ref} />
      <input {...context.hiddenInputProps} />
    </TagsInputProvider>
  )
})

TagsInputRoot.displayName = 'TagsInputRoot'
