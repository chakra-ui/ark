'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from '../field/use-field-context.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'

export interface TagsInputInputBaseProps extends PolymorphicProps {}
export interface TagsInputInputProps extends HTMLProps<'input'>, TagsInputInputBaseProps {}

export const TagsInputInput = forwardRef<HTMLInputElement, TagsInputInputProps>((props, ref) => {
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(tagsInput.getInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

TagsInputInput.displayName = 'TagsInputInput'
