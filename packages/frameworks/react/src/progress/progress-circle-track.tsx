import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleTrackProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleTrack = forwardRef<SVGCircleElement, ProgressCircleTrackProps>(
  (props) => {
    const api = useProgressContext()
    const mergedProps = mergeProps(api.circleTrackProps, props, {
      style: {
        // @ts-expect-error missing until new zag release
        cx: '50px',
        cy: '50px',
        r: '42px',
      },
    })

    return <ark.circle {...mergedProps} />
  },
)

ProgressCircleTrack.displayName = 'ProgressCircleTrack'
