import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { splitProps, type Assign } from '../split-props'
import { TagsInputProvider } from './tags-input-context'
import { useTagsInput, UseTagsInputProps } from './use-tags-input'

export type TagsInputProps = Assign<
  Assign<HTMLAtlasProps<'input'>, UseTagsInputProps>,
  {
    children: ReactNode | ((pages: UseTagsInputProps) => ReactNode)
  }
>

export const TagsInput = forwardRef<'input', TagsInputProps>((props, ref) => {
  const [useTagsInputProps, { children, ...inputProps }] = splitProps(props, [
    'addOnPaste',
    'allowEditTag',
    'allowOverflow',
    'autoFocus',
    'blurBehavior',
    'defaultValue',
    'delimiter',
    'dir',
    'disabled',
    'getRootNode',
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
    'readonly',
    'translations',
    'validate',
    'value',
  ])
  const tagsInput = useTagsInput(useTagsInputProps)
  const mergedProps = mergeProps(tagsInput.inputProps, inputProps)
  const view = runIfFn(children, tagsInput)

  return (
    <TagsInputProvider value={tagsInput}>
      <atlas.div>
        {view}
        <input {...mergedProps} ref={ref} />
      </atlas.div>
    </TagsInputProvider>
  )
})
