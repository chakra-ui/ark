import { type PropTypes, normalizeProps } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import type { ReactNode } from 'react'
import type { Optional } from '../../types'

export interface CreateToasterProps
  extends Optional<Partial<toast.GroupMachineContext<ReactNode>>, 'id'> {
  placement: toast.Placement
}

export interface CreateToasterReturn extends toast.GroupApi<PropTypes, ReactNode> {
  machine: toast.GroupService<ReactNode>
}

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const machine = toast.group.machine<ReactNode>({ id: '1', ...props })
  const api = toast.group.connect(machine, machine.send, normalizeProps)
  return { ...api, machine }
}
