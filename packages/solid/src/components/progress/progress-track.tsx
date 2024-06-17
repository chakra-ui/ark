import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressTrackBaseProps extends PolymorphicProps<'div'> {}
export interface ProgressTrackProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ProgressTrackBaseProps {}

export const ProgressTrack = (props: ProgressTrackProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getTrackProps(), props)

  return <ark.div {...mergedProps} />
}
