import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export interface SwitchThumbProps extends HTMLArkProps<'span'> {}

export const SwitchThumb = (props: SwitchThumbProps) => {
  const checkbox = useSwitchContext()
  const mergedProps = mergeProps(() => checkbox().thumbProps, props)

  return <ark.span {...mergedProps} />
}
