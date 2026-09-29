import { type HotkeyRecorderOptions, type HotkeyRecorderState, createHotkeyRecorder } from '@zag-js/hotkeys'
import { useSyncExternalStore } from '@zag-js/solid'
import { type Accessor, onCleanup, onMount } from 'solid-js'
import type { MaybeAccessor } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { useEnvironmentContext } from '../environment/use-environment-context.ts'

export interface UseHotkeyRecorderProps extends Omit<HotkeyRecorderOptions, 'target'> {}

export interface UseHotkeyRecorderReturn {
  /**
   * The current recorder state.
   */
  state: Accessor<HotkeyRecorderState>
  /**
   * Start listening for key events.
   */
  start: () => void
  /**
   * Stop listening and finalize the recorded hotkey.
   */
  stop: () => void
  /**
   * Stop listening and discard the recorded hotkey.
   */
  cancel: () => void
  /**
   * Clear the recorded hotkey.
   */
  clear: () => void
}

export const useHotkeyRecorder = (props: MaybeAccessor<UseHotkeyRecorderProps> = {}): UseHotkeyRecorderReturn => {
  const env = useEnvironmentContext()
  const recorder = createHotkeyRecorder()

  onMount(() => {
    const options = runIfFn(props)

    recorder.init(env().getRootNode() as Document)
    recorder.setOptions({
      onRecord: (hotkey) => runIfFn(props).onRecord?.(hotkey),
      onCancel: () => runIfFn(props).onCancel?.(),
      onClear: () => runIfFn(props).onClear?.(),
      ...(options.formatOptions && { formatOptions: options.formatOptions }),
      ...(options.sequenceTimeoutMs !== undefined && { sequenceTimeoutMs: options.sequenceTimeoutMs }),
    })

    onCleanup(() => recorder.destroy())
  })

  const state = useSyncExternalStore(
    (listener) => recorder.subscribe(listener),
    () => recorder.getState(),
  )

  return {
    state,
    start: () => void recorder.start(),
    stop: () => void recorder.stop(),
    cancel: () => void recorder.cancel(),
    clear: () => void recorder.clear(),
  }
}
