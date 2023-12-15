import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleTrackProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleTrack = forwardRef<SVGCircleElement, ProgressCircleTrackProps>(
  (props) => {
    const api = useProgressContext()
    const mergedProps = mergeProps(api.circleTrackProps, props)

    return <ark.circle {...mergedProps} />
  },
)

ProgressCircleTrack.displayName = 'ProgressCircleTrack'
