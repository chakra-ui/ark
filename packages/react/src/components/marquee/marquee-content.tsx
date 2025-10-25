import { mergeProps } from '@zag-js/react'
import { type ReactNode, forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMarqueeContext } from './use-marquee-context'

export interface MarqueeContentBaseProps extends PolymorphicProps {
  children: ReactNode
}
export interface MarqueeContentProps extends Omit<HTMLProps<'div'>, 'children'>, MarqueeContentBaseProps {}

export const MarqueeContent = forwardRef<HTMLDivElement, MarqueeContentProps>((props, ref) => {
  const { children, ...localProps } = props
  const marquee = useMarqueeContext()

  return (
    <>
      {Array.from({ length: marquee.contentCount }).map((_, index) => {
        const mergedProps = mergeProps(marquee.getContentProps({ index }), localProps)
        return (
          <ark.div key={index} {...mergedProps} ref={index === 0 ? ref : undefined}>
            {children}
          </ark.div>
        )
      })}
    </>
  )
})

MarqueeContent.displayName = 'MarqueeContent'
