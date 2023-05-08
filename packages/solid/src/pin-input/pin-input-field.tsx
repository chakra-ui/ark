import { mergeProps } from '@zag-js/solid'
import { splitProps } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePinInputContext } from './pin-input-context'

export type PinInputFieldProps = Assign<HTMLArkProps<'input'>, { index: number }>

export const PinInputField = (props: PinInputFieldProps) => {
  const [inputParams, localProps] = splitProps(props, ['index'])

  const api = usePinInputContext()
  const inputProps = mergeProps(() => api().getInputProps(inputParams), localProps)

  return <ark.input {...inputProps} />
}
