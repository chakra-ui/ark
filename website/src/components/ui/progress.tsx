import { forwardRef } from 'react'
import * as ArkProgress from './primitives/progress'

export interface ProgressProps extends ArkProgress.RootProps {
  /**
   * The type of progress to render.
   * @default linear
   */
  type?: 'linear' | 'circular'
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  const { children, type = 'linear', ...rootProps } = props

  return (
    <ArkProgress.Root ref={ref} {...rootProps}>
      {children && <ArkProgress.Label>{children}</ArkProgress.Label>}
      {type === 'linear' && (
        <ArkProgress.Track>
          <ArkProgress.Range />
        </ArkProgress.Track>
      )}
      {type === 'circular' && (
        <ArkProgress.Circle>
          <ArkProgress.CircleTrack />
          <ArkProgress.CircleRange />
          <ArkProgress.ValueText />
        </ArkProgress.Circle>
      )}
      <ArkProgress.ValueText />
    </ArkProgress.Root>
  )
})

Progress.displayName = 'Progress'
