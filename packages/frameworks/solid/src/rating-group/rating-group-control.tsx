import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRatingGroupContext, type RatingGroupContext } from './rating-group-context'

export type RatingGroupControlProps = Assign<
  HTMLArkProps<'div'>,
  {
    children?: JSX.Element | ((context: RatingGroupContext) => JSX.Element)
  }
>

export const RatingGroupControl = (props: RatingGroupControlProps) => {
  const api = useRatingGroupContext()
  const getChildren = () => runIfFn(props.children, api)
  const mergedProps = mergeProps(() => api().controlProps, props)

  return (
    <>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
      <input {...api().hiddenInputProps} />
    </>
  )
}
