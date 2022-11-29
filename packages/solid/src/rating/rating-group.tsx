import { children } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { RatingContext, useRatingContext } from './rating-context'

export type RatingGroupProps = Omit<HTMLArkProps<'div'>, 'children'> & {
  children: JSX.Element | ((context: RatingContext) => JSX.Element)
  renderIcon?: never
}

export const RatingGroup = (props: RatingGroupProps) => {
  const [localProps, divProps] = createSplitProps<{
    children: JSX.Element | ((context: RatingContext) => JSX.Element)
    renderIcon?: never
  }>()(props, ['renderIcon', 'children'])

  const rating = useRatingContext()
  const view = children(() => runIfFn(localProps.children, rating))

  return (
    <ark.div {...rating().itemGroupProps} {...divProps}>
      {view()}
    </ark.div>
  )
}
