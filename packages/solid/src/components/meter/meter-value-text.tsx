import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useMeterContext } from './use-meter-context.ts'

export interface MeterValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface MeterValueTextProps extends HTMLProps<'span'>, MeterValueTextBaseProps {}

export const MeterValueText = (props: MeterValueTextProps) => {
  const api = useMeterContext()
  const mergedProps = mergeProps(() => api().getValueTextProps(), props)

  return <ark.span {...mergedProps}>{props.children || api().valueAsString}</ark.span>
}
