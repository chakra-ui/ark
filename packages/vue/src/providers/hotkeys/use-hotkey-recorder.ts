import { type HotkeyRecorderOptions, type HotkeyRecorderState, createHotkeyRecorder } from '@zag-js/hotkeys'
import { useSyncExternalStore } from '@zag-js/vue'
import { type MaybeRef, type Ref, onMounted, onUnmounted, toValue } from 'vue'
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../environment/use-environment-context.ts'

export interface UseHotkeyRecorderProps extends Omit<HotkeyRecorderOptions, 'target'> {}

export interface UseHotkeyRecorderReturn {
  /**
   * The current recorder state.
   */
  state: Readonly<Ref<HotkeyRecorderState>>
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

export const useHotkeyRecorder = (props: MaybeRef<UseHotkeyRecorderProps> = {}): UseHotkeyRecorderReturn => {
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const recorder = createHotkeyRecorder()

  onMounted(() => {
    const options = toValue(props)

    recorder.init(env.value.getRootNode() as Document)
    recorder.setOptions({
      onRecord: (hotkey) => toValue(props).onRecord?.(hotkey),
      onCancel: () => toValue(props).onCancel?.(),
      onClear: () => toValue(props).onClear?.(),
      ...(options.formatOptions && { formatOptions: options.formatOptions }),
      ...(options.sequenceTimeoutMs !== undefined && { sequenceTimeoutMs: options.sequenceTimeoutMs }),
    })
  })

  onUnmounted(() => {
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
