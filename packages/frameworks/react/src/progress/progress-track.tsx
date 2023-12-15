import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressTrackProps extends HTMLArkProps<'div'> {}

export const ProgressTrack = forwardRef<HTMLDivElement, ProgressTrackProps>((props, ref) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(api.trackProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

ProgressTrack.displayName = 'ProgressTrack'
