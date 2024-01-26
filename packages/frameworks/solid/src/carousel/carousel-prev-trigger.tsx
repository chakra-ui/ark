import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselPrevTriggerProps extends HTMLArkProps<'button'> {}

export const CarouselPrevTrigger: ArkComponent<'button'> = (props) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().prevTriggerProps, props)

  return <ark.button {...mergedProps} />
}
