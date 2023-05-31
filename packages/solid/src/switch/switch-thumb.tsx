import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export type SwitchThumbProps = HTMLArkProps<'span'>

export const SwitchThumb = (props: SwitchThumbProps) => {
  const checkbox = useSwitchContext()
  const thumbProps = mergeProps(() => checkbox().thumbProps, props)
  return <ark.span {...thumbProps} />
}
