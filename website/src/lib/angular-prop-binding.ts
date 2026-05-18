export type AngularPropKind = 'input' | 'required-input' | 'model' | 'output'

export const formatAngularPropName = (name: string, kind?: AngularPropKind): string => {
  switch (kind) {
    case 'input':
    case 'required-input':
      return `[${name}]`
    case 'model':
      return `[(${name})]`
    case 'output':
      return `(${name})`
    default:
      return name
  }
}

export const isAngularRequiredKind = (kind?: AngularPropKind): boolean => kind === 'required-input'
