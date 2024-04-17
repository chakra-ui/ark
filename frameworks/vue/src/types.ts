import type {
  AllowedComponentProps,
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  EmitsOptions,
  ExtractPropTypes,
  PropType,
  SlotsType,
  VNodeProps,
} from 'vue'

export type ComponentFactory<
  // biome-ignore lint:lint/complexity/noBannedTypes Empty Object on Purpose
  Props extends {} = {},
  Emits extends {} = EmitsOptions,
  Slots extends {} = SlotsType<Record<string, unknown>>,
> = DefineComponent<
  Props,
  () => JSX.Element,
  // biome-ignore lint:lint/complexity/noBannedTypes Empty Object on Purpose
  {},
  // biome-ignore lint:lint/complexity/noBannedTypes Empty Object on Purpose
  {},
  // biome-ignore lint:lint/complexity/noBannedTypes Empty Object on Purpose
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  Emits,
  string,
  VNodeProps & AllowedComponentProps & ComponentCustomProps,
  Readonly<ExtractPropTypes<Props>>,
  // biome-ignore lint:lint/complexity/noBannedTypes Empty Object on Purpose
  {},
  Slots
>

export type ComponentWithProps<Props extends {}> = ComponentFactory<Props>

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
