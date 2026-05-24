import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTourContext } from './use-tour-context.ts'

export interface TourTitleBaseProps extends PolymorphicProps<'h2'> {}
export interface TourTitleProps extends HTMLProps<'h2'>, TourTitleBaseProps {}

export const TourTitle = (props: TourTitleProps) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(() => tour().getTitleProps(), props)

  return <ark.h2 {...mergedProps}>{mergedProps.children || tour().step?.title}</ark.h2>
}
