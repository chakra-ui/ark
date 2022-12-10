export const isImageExisting = (url: string) => {
  try {
    require(`@site/static/img/${url}`).default
    return true
  } catch {
    return false
  }
}
