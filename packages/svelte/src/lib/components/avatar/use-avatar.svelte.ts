import { machine, connect } from '@zag-js/avatar'
import type { Context, Api } from '@zag-js/avatar'
import { type PropTypes, useMachine } from '@zag-js/svelte'
import type { Optional } from '../../../typts'
import { useConnect } from '$lib/utils/use-connect.svelte'

export interface UseAvatarProps
  extends Optional<Omit<Context, 'dir' | 'getRootNode'>, 'id'> { }
export interface UseAvatarReturn extends Api<PropTypes> { }

export const useAvatar = (props: UseAvatarProps) => {
  const stateMachine = useMachine(machine({ id: '1' }))
  const reactiveConnectApi = useConnect(stateMachine, connect)

  return reactiveConnectApi;
}
