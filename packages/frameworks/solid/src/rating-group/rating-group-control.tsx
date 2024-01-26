import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRatingGroupContext } from './rating-group-context'
import type { UseRatingGroupReturn } from './use-rating-group'

interface ElementProps {
  children?: JSX.Element | ((api: UseRatingGroupReturn) => JSX.Element)
}

export interface RatingGroupControlProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const RatingGroupControl: ArkComponent<'div', ElementProps> = (
  props: RatingGroupControlProps,
) => {
  const api = useRatingGroupContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  const getChildren = () => runIfFn(props.children, api)

  return (
    <>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
      <input {...api().hiddenInputProps} />
    </>
  )
}
