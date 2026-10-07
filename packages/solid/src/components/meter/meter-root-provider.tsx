import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseMeterReturn } from './use-meter.ts'
import { MeterProvider } from './use-meter-context.ts'

interface RootProviderProps {
  value: UseMeterReturn
}

export interface MeterRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface MeterRootProviderProps extends HTMLProps<'div'>, RootProviderProps, MeterRootProviderBaseProps {}

export const MeterRootProvider = (props: MeterRootProviderProps) => {
  const [{ value: meter }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => meter().getRootProps(), localProps)

  return (
    <MeterProvider value={meter}>
      <ark.div {...mergedProps} />
    </MeterProvider>
  )
}
