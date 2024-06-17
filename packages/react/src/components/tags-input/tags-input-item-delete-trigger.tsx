import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemDeleteTriggerBaseProps extends PolymorphicProps {}
export interface TagsInputItemDeleteTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    TagsInputItemDeleteTriggerBaseProps {}

export const TagsInputItemDeleteTrigger = forwardRef<
  HTMLButtonElement,
  TagsInputItemDeleteTriggerProps
>((props, ref) => {
  const tagsInput = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = mergeProps(tagsInput.getItemDeleteTriggerProps(itemProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})

TagsInputItemDeleteTrigger.displayName = 'TagsInputItemDeleteTrigger'
