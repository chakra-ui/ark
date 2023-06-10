import { hydrate } from 'solid-js/web'

export function render(pageContext: any) {
  hydrate(() => <pageContext.Page></pageContext.Page>, document.getElementById('root')!)
}
