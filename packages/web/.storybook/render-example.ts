/** Storybook owns the host; examples only mount ordinary HTML and listeners. */
export const renderExample = (mount: (root: HTMLElement) => void) => () => {
  const root = document.createElement('div')
  mount(root)
  return root
}
