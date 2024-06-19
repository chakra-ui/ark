import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleTrackBaseProps extends PolymorphicProps<'circle'> {}
export interface ProgressCircleTrackProps
  extends HTMLProps<'circle'>,
    ProgressCircleTrackBaseProps {}

export const ProgressCircleTrack = (props: ProgressCircleTrackProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getCircleTrackProps(), props)

  return <ark.circle {...mergedProps} />
}
