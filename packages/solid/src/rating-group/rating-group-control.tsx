import { children } from 'solid-js'
import { type JSX } from 'solid-js/jsx-runtime'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useRatingGroupContext, type RatingGroupContext } from './rating-group-context'

export type RatingGroupControlProps = Omit<HTMLArkProps<'div'>, 'children'> & {
  children: JSX.Element | ((context: RatingGroupContext) => JSX.Element)
}

export const RatingGroupControl = (props: RatingGroupControlProps) => {
  const ratingGroup = useRatingGroupContext()
  const view = children(() => runIfFn(props.children, ratingGroup))

  return (
    <ark.div {...ratingGroup().controlProps} {...props}>
      {view()}
    </ark.div>
  )
}
