import * as toast from '@zag-js/toast'
import { type PropTypes, normalizeProps } from '@zag-js/vue'
import type { VNodeChild } from 'vue'
import type { Optional } from '../../types'

export interface CreateToasterProps extends Optional<Partial<toast.GroupMachineContext>, 'id'> {
  placement: toast.Placement
}

export interface CreateToasterReturn extends toast.GroupApi<PropTypes, VNodeChild> {
  machine: toast.GroupService<VNodeChild>
}

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const machine = toast.group.machine({ id: '1', ...props })
  const api = toast.group.connect(machine, machine.send, normalizeProps)
  return { ...api, machine }
}
