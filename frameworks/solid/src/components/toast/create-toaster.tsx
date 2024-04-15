import { type PropTypes, normalizeProps } from '@zag-js/solid'
import * as toast from '@zag-js/toast'
import type { JSX } from 'solid-js'
import type { Optional } from '../../types'

export interface CreateToasterProps
  extends Optional<Partial<toast.GroupMachineContext<JSX.Element>>, 'id'> {
  placement: toast.Placement
}

export interface CreateToasterReturn extends toast.GroupApi<PropTypes, JSX.Element> {
  machine: toast.GroupService<JSX.Element>
}

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const machine = toast.group.machine<JSX.Element>({ id: '1', ...props })
  const api = toast.group.connect(machine, machine.send, normalizeProps)
  return { ...api, machine }
}
