import { getApiDoc } from '@zag-js/docs'
import { Fragment } from 'react'
import { Heading } from '~/components/ui/heading'
import { ApiTable } from './api-table'

interface Props {
  id: string
}

export const ContextType = (props: Props) => {
  try {
    const apiDoc = getApiDoc(props.id as any)

    return (
      <Fragment>
        {apiDoc.api && Object.keys(apiDoc.api).length > 0 && (
          <>
            <Heading as="h3" size="xl">
              API
            </Heading>
            <ApiTable api={apiDoc.api} />
          </>
        )}
      </Fragment>
    )
  } catch {
    return null
  }
}
