import type { PropType } from 'vue'

/**
 * Assign property types from right to left.
 * Handy for overriding e.g. `onChange` from an HTMLElement with your own type
 */
export type Assign<Target, Source> = Omit<Target, keyof Source> & Source

/**
 * Type to make properties optional and preserve their type
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

/**
 * Take a type T and convert its properties to Vue props to ensure none has been left out.
 */
export type VueProps<T> = {
  [K in keyof T]: {
    type: PropType<T[K]>
    default?: T[K]
    required?: boolean
  }
}

export type CollectionItem = string | object
