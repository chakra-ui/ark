export type RenderStatus = 'unmounted' | 'mounted' | 'exiting'

export type RenderState = { status: RenderStatus }

export const initialState = (present: boolean, lazyMount: boolean): RenderState => {
  if (present) return { status: 'mounted' }
  return lazyMount ? { status: 'unmounted' } : { status: 'mounted' }
}

export const onPresentChange = (state: RenderState, present: boolean): RenderState => {
  if (present) return state.status === 'mounted' ? state : { status: 'mounted' }
  if (state.status === 'unmounted') return state
  return state.status === 'exiting' ? state : { status: 'exiting' }
}

export const onExitComplete = (state: RenderState, unmountOnExit = true): RenderState => {
  if (state.status !== 'exiting') return state
  return unmountOnExit ? { status: 'unmounted' } : { status: 'mounted' }
}
