import { normalizeProps } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import type { Optional } from '../../types'

type GroupContext = Partial<toast.GroupMachineContext>

export interface CreateToasterProps extends Optional<GroupContext, 'id'> {
  placement: toast.Placement
}

export const createToaster = (props: CreateToasterProps) => {
  const machine = toast.group.machine({ id: '1', ...props })
  const api = toast.group.connect(machine, machine.send, normalizeProps)
  return { ...api, machine }
}
