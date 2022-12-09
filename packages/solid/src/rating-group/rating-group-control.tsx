import { children } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { RatingGroupContext, useRatingGroupContext } from './rating-group-context'

export type RatingGroupControlProps = Omit<HTMLArkProps<'div'>, 'children'> & {
  children: JSX.Element | ((context: RatingGroupContext) => JSX.Element)
}

export const RatingGroupControl = (props: RatingGroupControlProps) => {
  const rating = useRatingGroupContext()
  const view = children(() => runIfFn(props.children, rating))

  return (
    <ark.div {...rating().itemGroupProps} {...props}>
      {view()}
    </ark.div>
  )
}
