import { panda } from '@/panda/jsx'
import { radio } from '@/panda/recipes'

export const Radio = (props: any) => {
  const { children, defaultChecked, ...rest } = props
  return (
    <panda.label data-part="root" data-scope="radio" className={radio()}>
      <input type="radio" data-part="input" data-scope="radio" data-peer {...rest} />
      <panda.div data-part="control" data-scope="radio" aria-checked={defaultChecked} />
      {children && (
        <panda.span data-part="label" data-scope="radio">
          {children}
        </panda.span>
      )}
    </panda.label>
  )
}
