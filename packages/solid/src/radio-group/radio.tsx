import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { RadioProvider, type RadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioProps = Assign<HTMLArkProps<'label'>, RadioContext>

export const Radio = (props: RadioProps) => {
  const [contextProps, restProps] = createSplitProps<RadioContext>()(props, [
    'value',
    'disabled',
    'invalid',
    'readOnly',
  ])

  const api = useRadioGroupContext()

  const radioProps = mergeProps(() => api().getRadioProps(contextProps), restProps)

  return (
    <RadioProvider value={contextProps}>
      <ark.label {...radioProps} />
    </RadioProvider>
  )
}
