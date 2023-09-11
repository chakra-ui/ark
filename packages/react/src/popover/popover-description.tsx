import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverDescriptionProps = HtmlArkProps<'div'>

export const PopoverDescription = forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  (props, ref) => {
    const { descriptionProps } = usePopoverContext()
    const mergedProps = mergeProps(descriptionProps, props)

    return <ark.p {...mergedProps} ref={ref} />
  },
)

PopoverDescription.displayName = 'PopoverDescription'
