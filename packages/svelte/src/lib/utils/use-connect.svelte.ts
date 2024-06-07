import { normalizeProps } from "@zag-js/svelte";

const createApi = (initial: any) => {
  let api = $state(initial)

  return {
    ...initial,
    get api() {
      return api;
    },
    set api(value: any) {
      api = value
    }
  }
}

export const useConnect = <U extends CallableFunction>(stateMachine: any, connect: U) => {
  const [snapshot, send] = stateMachine
  const reactiveApi = createApi(connect(snapshot, send, normalizeProps))

  $effect(() => {
    reactiveApi.api = connect(snapshot, send, normalizeProps)
  })

  return reactiveApi
} 