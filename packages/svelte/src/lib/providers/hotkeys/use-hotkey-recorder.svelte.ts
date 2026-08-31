import { type HotkeyRecorderOptions, type HotkeyRecorderState, createHotkeyRecorder } from '@zag-js/hotkeys'
import { useSyncExternalStore } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { onDestroy } from 'svelte'
import { useEnvironmentContext } from '../environment/use-environment-context.ts'

export interface UseHotkeyRecorderProps extends Omit<HotkeyRecorderOptions, 'target'> {}

export interface UseHotkeyRecorderReturn {
  /**
   * The current recorder state.
   */
  state: () => HotkeyRecorderState
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

export function useHotkeyRecorder(props: MaybeFunction<UseHotkeyRecorderProps> = {}): UseHotkeyRecorderReturn {
  const env = useEnvironmentContext()
  const recorder = createHotkeyRecorder()

  $effect(() => {
    const options = runIfFn(props)

    recorder.init(env().getRootNode() as Document)
    recorder.setOptions({
      onRecord: (hotkey) => runIfFn(props).onRecord?.(hotkey),
      onCancel: () => runIfFn(props).onCancel?.(),
      onClear: () => runIfFn(props).onClear?.(),
      ...(options.formatOptions && { formatOptions: options.formatOptions }),
      ...(options.sequenceTimeoutMs !== undefined && { sequenceTimeoutMs: options.sequenceTimeoutMs }),
    })
  })

  onDestroy(() => {
    recorder.destroy()
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
