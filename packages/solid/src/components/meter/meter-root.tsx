import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseMeterProps, useMeter } from './use-meter.ts'
import { MeterProvider } from './use-meter-context.ts'

export interface MeterRootBaseProps extends UseMeterProps, PolymorphicProps<'div'> {}
export interface MeterRootProps extends HTMLProps<'div'>, MeterRootBaseProps {}

export const MeterRoot = (props: MeterRootProps) => {
  const [meterProps, localProps] = createSplitProps<UseMeterProps>()(props, [
    'defaultValue',
    'formatOptions',
    'high',
    'id',
    'ids',
    'locale',
    'low',
    'max',
    'min',
    'onValueChange',
    'optimum',
    'orientation',
    'translations',
    'value',
  ])

  const api = useMeter(meterProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <MeterProvider value={api}>
      <ark.div {...mergedProps} />
    </MeterProvider>
  )
}
