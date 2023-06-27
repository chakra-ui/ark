import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { SegmentProvider, type SegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentProps = Assign<HTMLArkProps<'label'>, SegmentContext>

export const Segment = (props: SegmentProps) => {
  const [contextProps, restProps] = createSplitProps<SegmentContext>()(props, [
    'value',
    'disabled',
    'invalid',
    'readOnly',
  ])

  const api = useSegmentGroupContext()

  const rootProps = mergeProps(() => api().getRadioProps(contextProps), restProps)

  return (
    <SegmentProvider value={contextProps}>
      <ark.label {...rootProps} {...parts.radio.attrs} />
    </SegmentProvider>
  )
}
