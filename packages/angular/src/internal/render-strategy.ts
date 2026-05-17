export type RenderStatus = 'unmounted' | 'mounted' | 'exiting'

export type RenderState = { status: RenderStatus }

export const initialState = (present: boolean, _lazy: boolean): RenderState => {
  if (present) return { status: 'mounted' }
  return { status: 'unmounted' }
}

export const onPresentChange = (state: RenderState, present: boolean): RenderState => {
  if (present) return { status: 'mounted' }
  if (state.status === 'mounted') return { status: 'exiting' }
  if (state.status === 'exiting') return { status: 'exiting' }
  return { status: 'unmounted' }
}

export const onExitComplete = (_state: RenderState): RenderState => {
  return { status: 'unmounted' }
}
