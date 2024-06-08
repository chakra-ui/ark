import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'

import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadGuideProps extends HTMLArkProps<'div'> {}

export const SignaturePadGuide = forwardRef<HTMLDivElement, SignaturePadGuideProps>(
  (props, ref) => {
    const signature = useSignaturePadContext()
    const mergedProps = mergeProps(signature.getGuideProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SignaturePadGuide.displayName = 'SignaturePadGuide'
