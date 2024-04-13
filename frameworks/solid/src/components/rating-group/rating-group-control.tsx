import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupControlProps extends HTMLArkProps<'div'> {}

export const RatingGroupControl = (props: RatingGroupControlProps) => {
  const api = useRatingGroupContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return (
    <>
      <ark.div {...mergedProps} />
      <input {...api().hiddenInputProps} />
    </>
  )
}
