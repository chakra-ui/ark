export const getFunctionString = (func: Function): string => {
  try {
    return func.toString()
  } catch {
    switch (func.constructor.name) {
      case 'AsyncFunction':
        return 'async function () {}'
      case 'AsyncGeneratorFunction':
        return 'async function * () {}'
      case 'GeneratorFunction':
        return 'function * () {}'
      default:
        return 'function () {}'
    }
  }
}
