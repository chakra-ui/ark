import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useMeterContext } from './use-meter-context.ts'

export interface MeterTrackBaseProps extends PolymorphicProps<'div'> {}
export interface MeterTrackProps extends HTMLProps<'div'>, MeterTrackBaseProps {}

export const MeterTrack = (props: MeterTrackProps) => {
  const api = useMeterContext()
  const mergedProps = mergeProps(() => api().getTrackProps(), props)

  return <ark.div {...mergedProps} />
}
