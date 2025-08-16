import { mergeProps } from '@zag-js/react'
import type { Orientation } from '@zag-js/types'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

interface ThumbProps {
  orientation?: Orientation
}

export interface ScrollAreaThumbBaseProps extends ThumbProps, PolymorphicProps {}
export interface ScrollAreaThumbProps extends HTMLProps<'div'>, ScrollAreaThumbBaseProps {}

export const ScrollAreaThumb = forwardRef<HTMLDivElement, ScrollAreaThumbProps>((props, ref) => {
  const [thumbProps, localProps] = createSplitProps<ThumbProps>()(props, ['orientation'])
  const scrollAreaApi = useScrollAreaContext()
  const mergedProps = mergeProps(scrollAreaApi.getThumbProps(thumbProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

ScrollAreaThumb.displayName = 'ScrollAreaThumb'
