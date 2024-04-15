import { type PropTypes, normalizeProps } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import type { VNode } from 'vue'
import type { Optional } from '../../types'

export interface CreateToasterProps
  extends Optional<Partial<toast.GroupMachineContext<VNode>>, 'id'> {
  placement: toast.Placement
}

export interface CreateToasterReturn extends toast.GroupApi<PropTypes, VNode> {
  machine: toast.GroupService<VNode>
}

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const machine = toast.group.machine<VNode>({ id: '1', ...props })
  const api = toast.group.connect(machine, machine.send, normalizeProps)
  return { ...api, machine }
}
