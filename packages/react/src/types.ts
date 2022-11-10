/**
 * Assign property types from right to left.
 * Handy for overriding e.g. `onChange` from an HTMLElement with your own type
 */
export type Assign<Target, Source> = Omit<Target, keyof Source> & Source

/**
 * Type to make the id property optional, but keep its type
 */
export type OptionalId<Target extends { id: unknown }> = Omit<Target, 'id'> & { id?: Target['id'] }

export {}
