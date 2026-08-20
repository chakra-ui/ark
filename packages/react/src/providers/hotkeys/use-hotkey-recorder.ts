'use client'

import { type HotkeyRecorderOptions, type RecordedHotkey, createHotkeyRecorder } from '@zag-js/hotkeys'
import { useCallback, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { useEvent } from '../../utils/use-event.ts'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect.ts'
import { useEnvironmentContext } from '../environment/use-environment-context.ts'

export interface UseHotkeyRecorderProps extends Omit<HotkeyRecorderOptions, 'target'> {}

export interface UseHotkeyRecorderReturn {
  /**
   * Whether the recorder is currently listening for key events.
   */
  recording: boolean
  /**
   * The hotkey recorded so far, or `null` if nothing has been recorded.
   */
  value: RecordedHotkey | null
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

export const useHotkeyRecorder = (props: UseHotkeyRecorderProps = {}): UseHotkeyRecorderReturn => {
  const { formatOptions, sequenceTimeoutMs } = props

  const env = useEnvironmentContext()
  const [recorder] = useState(() => createHotkeyRecorder())

  const onRecord = useEvent(props.onRecord)
  const onCancel = useEvent(props.onCancel)
  const onClear = useEvent(props.onClear)

  useSafeLayoutEffect(() => {
    recorder.init(env.getRootNode() as Document)
    recorder.setOptions({ onRecord, onCancel, onClear })
    return () => {
      recorder.destroy()
    }
  }, [recorder, env, onRecord, onCancel, onClear])

  const formatRef = useRef(formatOptions)
  formatRef.current = formatOptions

  const formatKey = formatOptions ? JSON.stringify(formatOptions) : ''

  useSafeLayoutEffect(() => {
    recorder.setOptions({
      ...(formatRef.current && { formatOptions: formatRef.current }),
      ...(sequenceTimeoutMs !== undefined && { sequenceTimeoutMs }),
    })
  }, [recorder, formatKey, sequenceTimeoutMs])

  const subscribe = useCallback((onChange: () => void) => recorder.subscribe(onChange), [recorder])
  const getSnapshot = useCallback(() => recorder.getState(), [recorder])

  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  return useMemo(
    () => ({
      recording: state.recording,
      value: state.value,
      start: () => void recorder.start(),
      stop: () => void recorder.stop(),
      cancel: () => void recorder.cancel(),
      clear: () => void recorder.clear(),
    }),
    [state, recorder],
  )
}
