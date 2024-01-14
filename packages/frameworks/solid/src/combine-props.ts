/* eslint-disable @typescript-eslint/no-explicit-any */
// forked from https://github.com/solidjs-community/solid-primitives/blob/2c841effabe3991ecb666e4787a28fd93ff4376b/packages/props/src/combineProps.ts

import type { Accessor, JSX, MergeProps } from 'solid-js'
import { $PROXY, mergeProps } from 'solid-js'

export type MaybeAccessor<T> = T | Accessor<T>
export type MaybeAccessorValue<T extends MaybeAccessor<any>> = T extends () => any
  ? ReturnType<T>
  : T

export const access = <T extends MaybeAccessor<any>>(v: T): MaybeAccessorValue<T> =>
  typeof v === 'function' && !v.length ? v() : v

export function chain<Args extends [] | any[]>(callbacks: {
  [Symbol.iterator](): IterableIterator<((...args: Args) => any) | undefined>
}): (...args: Args) => void {
  return (...args: Args) => {
    for (const callback of callbacks) callback && callback(...args)
  }
}

export function reverseChain<Args extends [] | any[]>(
  callbacks: (((...args: Args) => any) | undefined)[],
): (...args: Args) => void {
  return (...args: Args) => {
    for (let i = callbacks.length - 1; i >= 0; i--) {
      const callback = callbacks[i]
      callback && callback(...args)
    }
  }
}

function trueFn() {
  return true
}

export const propTraps: ProxyHandler<{
  get: (k: string | number | symbol) => any
  has: (k: string | number | symbol) => boolean
  keys: () => string[]
}> = {
  get(_, property, receiver) {
    if (property === $PROXY) return receiver
    return _.get(property)
  },
  has(_, property) {
    return _.has(property)
  },
  set: trueFn,
  deleteProperty: trueFn,
  getOwnPropertyDescriptor(_, property) {
    return {
      configurable: true,
      enumerable: true,
      get() {
        return _.get(property)
      },
      set: trueFn,
      deleteProperty: trueFn,
    }
  },
  ownKeys(_) {
    return _.keys()
  },
}

const extractCSSregex = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g

/**
 * converts inline string styles to object form
 * @example
 * const styles = stringStyleToObject("margin: 24px; border: 1px solid #121212");
 * styles; // { margin: "24px", border: "1px solid #121212" }
 * */
export function stringStyleToObject(style: string): JSX.CSSProperties {
  const object: Record<string, string> = {}
  let match: RegExpExecArray | null
  while ((match = extractCSSregex.exec(style))) {
    object[match[1]!] = match[2]!
  }
  return object
}

/**
 * Combines two set of styles together. Accepts both string and object styles.\
 * @example
 * const styles = combineStyle("margin: 24px; border: 1px solid #121212", {
 *   margin: "2rem",
 *   padding: "16px"
 * });
 * styles; // { margin: "2rem", border: "1px solid #121212", padding: "16px" }
 */
export function combineStyle(a: string, b: string): string
export function combineStyle(
  a: JSX.CSSProperties | undefined,
  b: JSX.CSSProperties | undefined,
): JSX.CSSProperties
export function combineStyle(
  a: JSX.CSSProperties | string | undefined,
  b: JSX.CSSProperties | string | undefined,
): JSX.CSSProperties
export function combineStyle(
  a: JSX.CSSProperties | string | undefined,
  b: JSX.CSSProperties | string | undefined,
): JSX.CSSProperties | string {
  if (typeof a === 'string') {
    if (typeof b === 'string') return `${a};${b}`

    a = stringStyleToObject(a)
  } else if (typeof b === 'string') {
    b = stringStyleToObject(b)
  }

  return { ...a, ...b }
}

type PropsInput = {
  class?: string
  className?: string
  classList?: Record<string, boolean | undefined>
  style?: JSX.CSSProperties | string
  ref?: Element | ((el: any) => void)
} & Record<string, any>

const reduce = <K extends keyof PropsInput>(
  sources: MaybeAccessor<PropsInput>[],
  key: K,
  calc: (a: NonNullable<PropsInput[K]>, b: NonNullable<PropsInput[K]>) => PropsInput[K],
) => {
  let v: PropsInput[K] = undefined
  for (const props of sources) {
    const propV = access(props)[key]
    if (!v) v = propV
    else if (propV) v = calc(v, propV)
  }
  return v
}

export type CombinePropsOptions = {
  /**
   * by default the event handlers will be called left-to-right,
   * following the order of the sources.
   * If this option is set to true, the handlers will be called right-to-left.
   */
  reverseEventHandlers?: boolean
}

/**
 * A helper that reactively merges multiple props objects together while smartly combining some of Solid's JSX/DOM attributes.
 *
 * Event handlers and refs are chained, class, classNames and styles are combined.
 * For all other props, the last prop object overrides all previous ones. Similarly to {@link mergeProps}
 * @param sources - Multiple sets of props to combine together.
 * @example
 * ```tsx
 * const MyButton: Component<ButtonProps> = props => {
 *    const { buttonProps } = createButton();
 *    const combined = combineProps(props, buttonProps);
 *    return <button {...combined} />
 * }
 * // component consumer can provide button props
 * // they will be combined with those provided by createButton() primitive
 * <MyButton style={{ margin: "24px" }} />
 * ```
 */
export function combineProps<T extends [] | MaybeAccessor<PropsInput>[]>(
  sources: T,
  options?: CombinePropsOptions,
): MergeProps<T>
export function combineProps<T extends [] | MaybeAccessor<PropsInput>[]>(
  ...sources: T
): MergeProps<T>
export function combineProps<T extends MaybeAccessor<PropsInput>[]>(
  ...args: T | [sources: T, options?: CombinePropsOptions]
): MergeProps<T> {
  const restArgs = Array.isArray(args[0])
  const sources = (restArgs ? args[0] : args) as T

  if (sources.length === 1) return sources[0] as MergeProps<T>

  const chainFn =
    restArgs && (args[1] as CombinePropsOptions | undefined)?.reverseEventHandlers
      ? reverseChain
      : chain

  // create a map of event listeners to be chained
  const listeners: Record<string, ((...args: any[]) => void)[]> = {}

  for (const props of sources) {
    const propsObj = access(props)
    for (const key in propsObj) {
      // skip non event listeners
      if (key[0] === 'o' && key[1] === 'n' && key[2]) {
        const v = propsObj[key]
        const name = key.toLowerCase()

        const callback: ((...args: any[]) => void) | undefined =
          typeof v === 'function'
            ? v
            : // jsx event handlers can be tuples of [callback, arg]
              Array.isArray(v)
              ? v.length === 1
                ? v[0]
                : v[0].bind(void 0, v[1])
              : void 0

        if (callback)
          listeners[name] ? listeners[name]!.push(callback) : (listeners[name] = [callback])
        else delete listeners[name]
      }
    }
  }

  const merge = mergeProps(...sources) as unknown as MergeProps<T>

  return new Proxy(
    {
      get(key) {
        if (typeof key !== 'string') return Reflect.get(merge, key)

        // Combine style prop
        if (key === 'style') return reduce(sources, 'style', combineStyle)

        // chain props.ref assignments
        if (key === 'ref') {
          const callbacks: ((el: any) => void)[] = []
          for (const props of sources) {
            const cb = access(props)[key] as ((el: any) => void) | undefined
            if (typeof cb === 'function') callbacks.push(cb)
          }
          return chainFn(callbacks)
        }

        // Chain event listeners
        if (key[0] === 'o' && key[1] === 'n' && key[2]) {
          const callbacks = listeners[key.toLowerCase()]
          return callbacks ? chainFn(callbacks) : Reflect.get(merge, key)
        }

        // Merge classes or classNames
        if (key === 'class' || key === 'className')
          return reduce(sources, key, (a, b) => `${a} ${b}`)

        // Merge classList objects, keys in the last object overrides all previous ones.
        if (key === 'classList') return reduce(sources, key, (a, b) => ({ ...a, ...b }))

        return Reflect.get(merge, key)
      },
      has(key) {
        return Reflect.has(merge, key)
      },
      keys() {
        return Object.keys(merge)
      },
    },
    propTraps,
  ) as any
}

// type check

// const com = combineProps(
//   {
//     onSomething: 123,
//     onWheel: (e: WheelEvent) => 213,
//     something: "foo",
//     style: { margin: "24px" },
//     once: true,
//     onMount: (fn: VoidFunction) => undefined
//   },
//   {
//     onSomething: [(n: number, s: string) => "fo", 123],
//     once: "ovv"
//   },
//   {
//     onWheel: false,
//     onMount: (n: number) => void 0
//   }
// );
// com.onSomething; // (s: string) => void;
// com.once; // string;
// com.onWheel; // false;
// com.onMount; // ((fn: VoidFunction) => undefined) & ((n: number) => undefined);
// com.something; // string;
// com.style; // string | JSX.CSSProperties;
