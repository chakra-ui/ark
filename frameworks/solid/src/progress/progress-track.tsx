import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressTrackProps extends HTMLArkProps<'div'> {}

export const ProgressTrack = (props: ProgressTrackProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().trackProps, props)

  return <ark.div {...mergedProps()} />
}
