/* eslint-disable no-case-declarations */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext, useAccordionMachineContext } from './accordion-context'
import type { UseAccordionReturn } from './use-accordion'

export interface AccordionDebugProps extends HTMLArkProps<'div'> {}

export const AccordionDebug = forwardRef<HTMLDivElement, AccordionDebugProps>((_, ref) => {
  const api = useAccordionContext() as UseAccordionReturn['api']
  const machine = useAccordionMachineContext() as UseAccordionReturn['machine']

  console.log(machine)
  return (
    <ark.div ref={ref} data-scope="accordion" data-part="debug">
      <ark.pre dir="ltr">
        <ark.details open>
          <ark.summary>Accordion Debug</ark.summary>
          <ark.div>Value: {api.value}</ark.div>
          <ark.div dangerouslySetInnerHTML={{ __html: stringifyState(machine.state) }} />
        </ark.details>
      </ark.pre>
    </ark.div>
  )
})

AccordionDebug.displayName = 'AccordionDebug'

const pick = (obj: Record<string, any>, keys: string[]) =>
  Object.fromEntries(keys.filter((key) => key in obj).map((key) => [key, obj[key]]))

export function stringifyState(state: Record<string, any>, omit?: string[]) {
  const code = JSON.stringify(
    state,
    (key, v) => {
      try {
        if (v.hasOwnProperty('target') && v.hasOwnProperty('timeStamp'))
          return pick(v, ['type', 'target', 'currentTarget', 'relatedTarget'])

        if (omit?.includes(key)) {
          return undefined
        }

        if (v.hasOwnProperty('calendar')) {
          return v.toString()
        }

        if (Number.isNaN(v)) {
          return 'NaN'
        }

        if (v instanceof File) {
          return v.name
        }

        switch (v?.toString()) {
          case '[object Machine]':
            const id = v.state.context.id ?? v.id
            return `Machine: ${id}`
          case '[object ShadowRoot]':
            return '#shadow-root'
          case '[object HTMLDocument]':
            return '#document'
          case '[object Window]':
            return '#window'
          case '[object AbortController]':
            return '#abort-cntroller'
          default:
            return v !== null && typeof v === 'object' && v.nodeType === 1 ? v.tagName : v
        }
      } catch {
        return v
      }
    },
    4,
  )
  // return formatHighlight(code)
  return code
}
