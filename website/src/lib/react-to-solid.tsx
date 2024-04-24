export const reactToSolid = (code: string) => {
  return code.replaceAll('react', 'solid').replaceAll('defaultValue=', 'value=')
}
