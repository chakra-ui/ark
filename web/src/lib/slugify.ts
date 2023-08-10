export const slugify = (x: string = '') =>
  x
    .toLowerCase()
    .replace(/[^\w0-9\s-+&]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[-&+]+/g, '-')
    .replace(/^-+|-+$/g, '')
