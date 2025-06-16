<script lang="ts">
  import type { Accessor } from '$lib/types.js'
  import { normalizeProps, useMachine } from '@zag-js/svelte'
  import * as toast from '@zag-js/toast'
  import type { Snippet } from 'svelte'
  import { useEnvironmentContext } from '../../providers/index.js'
  import { ToastProvider } from './use-toast-context.js'

  interface ToastItemProps {
    value: Accessor<toast.Props<Snippet>>
    parent: toast.GroupService
    index: number
    children: Snippet<[Accessor<toast.Options<Snippet>>]>
  }

  let { children, value, parent, index }: ToastItemProps = $props()

  const env = useEnvironmentContext()

  const machineProps = $derived.by(() => ({
    ...value(),
    parent,
    index,
    getRootNode: env().getRootNode,
  }))

  const service = useMachine(toast.machine, () => machineProps)
  const api = $derived(toast.connect(service, normalizeProps))

  ToastProvider(() => api)
</script>

{@render children(value)}
