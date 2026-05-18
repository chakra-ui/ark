import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useProgressContext } from './use-progress-context.ts'

export interface ProgressTrackBaseProps extends PolymorphicProps<'div'> {}
export interface ProgressTrackProps extends HTMLProps<'div'>, ProgressTrackBaseProps {}

export const ProgressTrack = (props: ProgressTrackProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getTrackProps(), props)

  return <ark.div {...mergedProps} />
}
