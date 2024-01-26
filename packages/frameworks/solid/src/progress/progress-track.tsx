import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressTrackProps extends HTMLArkProps<'div'> {}

export const ProgressTrack: ArkComponent<'div'> = (props) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().trackProps, props)

  return <ark.div {...mergedProps} />
}
