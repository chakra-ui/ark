import { styled } from '@/panda/jsx'
import { radio } from '@/panda/recipes'

export const Radio = (props: any) => {
  const { children, defaultChecked, ...rest } = props
  return (
    <styled.label data-part="root" data-scope="radio" className={radio()}>
      <input type="radio" data-part="input" className="peer" data-scope="radio" {...rest} />
      <styled.div data-part="control" data-scope="radio" aria-checked={defaultChecked} />
      {children && (
        <styled.span data-part="label" data-scope="radio">
          {children}
        </styled.span>
      )}
    </styled.label>
  )
}
