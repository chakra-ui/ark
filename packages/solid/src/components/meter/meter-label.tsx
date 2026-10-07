import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useMeterContext } from './use-meter-context.ts'

export interface MeterLabelBaseProps extends PolymorphicProps<'span'> {}
export interface MeterLabelProps extends HTMLProps<'span'>, MeterLabelBaseProps {}

export const MeterLabel = (props: MeterLabelProps) => {
  const api = useMeterContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.span {...mergedProps} />
}
