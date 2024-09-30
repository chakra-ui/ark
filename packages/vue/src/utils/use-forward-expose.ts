// Credit to the Radix Vue team: https://github.com/radix-vue/radix-vue/blob/main/packages/radix-vue/src/shared/useForwardExpose.ts

import { type ComponentPublicInstance, computed, getCurrentInstance, ref } from 'vue'
import { unrefElement } from './unref-element'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const isElement = (el: any): el is Element =>
  Object.prototype.hasOwnProperty.call(el, 'nodeName') && typeof el.nodeName === 'string'

export function useForwardExpose() {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const instance = getCurrentInstance()!

  const currentRef = ref<Element | ComponentPublicInstance | null>()

  const currentElement = computed<HTMLElement>(() => {
    // $el could be text/comment for non-single root normal or text root, thus we retrieve the nextElementSibling
    // @ts-expect-error ignore ts error
    return ['#text', '#comment'].includes(currentRef.value?.$el.nodeName)
      ? // @ts-expect-error ignore ts error
        currentRef.value?.$el.nextElementSibling
      : // @ts-expect-error ignore ts error
        unrefElement(currentRef)
  })

  // localExpose should only be assigned once else will create infinite loop
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const localExpose: Record<string, any> | null = Object.assign({}, instance.exposed)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const ret: Record<string, any> = {}

  // retrieve props for current instance
  for (const key in instance.props) {
    Object.defineProperty(ret, key, {
      enumerable: true,
      configurable: true,
      get: () => instance.props[key],
    })
  }

  // retrieve default exposed value
  if (Object.keys(localExpose).length > 0) {
    for (const key in localExpose) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        configurable: true,
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        get: () => localExpose![key],
      })
    }
  }

  // retrieve original first root element
  Object.defineProperty(ret, '$el', {
    enumerable: true,
    configurable: true,
    get: () => instance.vnode.el,
  })

  instance.exposed = ret

  function forwardRef(ref: Element | ComponentPublicInstance | null) {
    currentRef.value = ref

    if (isElement(ref) || !ref) return

    // retrieve the forwarded element
    Object.defineProperty(ret, '$el', {
      enumerable: true,
      configurable: true,
      get: () => ref.$el,
    })

    instance.exposed = ret
  }

  return { forwardRef, currentRef, currentElement }
}
