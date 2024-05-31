export const generateLicenseKey = () =>
  (
    Math.random()
      .toString(36)
      .substring(2)
      .substring(0, 9)
      .match(/.{1,3}/g) ?? []
  )
    .join('-')
    .toUpperCase()
