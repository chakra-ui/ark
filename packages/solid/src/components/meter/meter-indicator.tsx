import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useMeterContext } from './use-meter-context.ts'

export interface MeterIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface MeterIndicatorProps extends HTMLProps<'div'>, MeterIndicatorBaseProps {}

export const MeterIndicator = (props: MeterIndicatorProps) => {
  const api = useMeterContext()
  const mergedProps = mergeProps(() => api().getIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}
