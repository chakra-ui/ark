import { ark, type HTMLArkProps } from '../factory'

export type CarouselControlProps = HTMLArkProps<'div'>

export const CarouselControl = (props: CarouselControlProps) => <ark.div {...props} />
