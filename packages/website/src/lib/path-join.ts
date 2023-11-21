export const pathJoin = (...args: string[]) => {
  // In development mode on Windows, path.join will not work correctly

  return args
    .map((part, i) => {
      if (i === 0) {
        return part.trim().replace(/[\/]*$/g, '')
      } else {
        return part.trim().replace(/(^[\/]*|[\/]*$)/g, '')
      }
    })
    .filter((x) => x.length)
    .join('/')
}
