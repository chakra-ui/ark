/* eslint-disable @typescript-eslint/no-explicit-any */
import { mergeProps as zagMergeProps } from '@zag-js/core'
import { type Accessor } from 'solid-js'

export type MaybeAccessor<T> = T | (() => T)

export function mergeProps<T>(source: MaybeAccessor<T>): Accessor<T>
export function mergeProps<T, U>(source: MaybeAccessor<T>, source1: MaybeAccessor<U>): T & U
export function mergeProps<T, U, V>(
  source: MaybeAccessor<T>,
  source1: MaybeAccessor<U>,
  source2: MaybeAccessor<V>,
): T & U & V
export function mergeProps<T, U, V, W>(
  source: MaybeAccessor<T>,
  source1: MaybeAccessor<U>,
  source2: MaybeAccessor<V>,
  source3: MaybeAccessor<W>,
): T & U & V & W
export function mergeProps(...sources: any[]) {
  const target = {}
  for (let i = 0; i < sources.length; i++) {
    let source = sources[i]
    if (typeof source === 'function') source = source()
    if (source) {
      const descriptors = Object.getOwnPropertyDescriptors(source)
      for (const key in descriptors) {
        if (key in target) continue
        Object.defineProperty(target, key, {
          enumerable: true,
          get() {
            let e = {}
            if (key === 'style' || key === 'class' || key.startsWith('on')) {
              for (let i = 0; i < sources.length; i++) {
                let s = sources[i]
                if (typeof s === 'function') s = s()
                e = zagMergeProps(e, { [key]: (s || {})[key] })
              }

              return (e as any)[key]
            }
            for (let i = sources.length - 1; i >= 0; i--) {
              let v,
                s = sources[i]
              if (typeof s === 'function') s = s()
              v = (s || {})[key]
              if (v !== undefined) return v
            }
          },
        })
      }
    }
  }
  return target
}
