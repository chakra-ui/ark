import type { InputProps } from '@zag-js/pin-input'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'
import { omit } from '@zag-js/utils'

export interface PinInputInputBaseProps extends InputProps, PolymorphicProps<'input'> {}
export interface PinInputInputProps extends HTMLProps<'input'>, PinInputInputBaseProps {}

export const PinInputInput = (props: PinInputInputProps) => {
  const [inputProps, localProps] = createSplitProps<InputProps>()(props, ['index'])
  const api = usePinInputContext()
  const mergedProps = mergeProps(() => api().getInputProps(inputProps), localProps)

  let lastValue = ''
  function onInput(e: InputEvent & { currentTarget: HTMLInputElement; target: HTMLInputElement }) {
    const nextValue = e.target.value
    if (nextValue === lastValue) return
    lastValue = nextValue
    ;(mergedProps.onInput as (e: InputEvent) => void)?.(e)
  }

  return <ark.input {...omit(mergedProps, ['onInput'])} onInput={onInput} />
}
