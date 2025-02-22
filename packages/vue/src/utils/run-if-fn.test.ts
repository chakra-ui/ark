import { runIfFn } from './run-if-fn'

describe('Util: runIfFn', () => {
  it('should pass through a non function value', () => {
    const valueOrFn = 'string value'
    const result = runIfFn(valueOrFn)
    expect(result).toEqual('string value')
  })

  it('should call a function value', () => {
    const valueOrFn = () => 'function result'
    const result = runIfFn(valueOrFn)
    expect(result).toEqual('function result')
  })

  it('should infer the argument type', () => {
    const valueOrFn = (suffix: string) => `function result ${suffix}`
    const result = runIfFn(valueOrFn, 'suffix')
    expect(result).toEqual('function result suffix')
  })

  it('should infer an invalid argument type', () => {
    const valueOrFn = (suffix: string) => `function result ${suffix}`
    // @ts-expect-error number is not a string
    runIfFn(valueOrFn, 1337)
  })

  it('should infer the return type', () => {
    const valueOrFn = (suffix: string) => `function result ${suffix}`
    const result: string = runIfFn(valueOrFn, 'suffix')
    expect(result).toEqual('function result suffix')
  })

  it('should infer the return type with explicit typings', () => {
    const valueOrFn: ((suffix: string) => string) | string = (suffix: string) => `function result ${suffix}`
    const result: string = runIfFn(valueOrFn, 'suffix')
    expect(result).toEqual('function result suffix')
  })

  it('should infer the return type even if it is a nested function', () => {
    const valueOrFn = (suffix: string) => () => `function result ${suffix}`
    const result: () => string = runIfFn(valueOrFn, 'suffix')
    expect(typeof result).toBe('function')
  })
})
