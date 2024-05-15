import { Fragment } from 'react'
import { Heading } from '~/components/ui'
import { getServerContext } from '~/lib/server-context'
import { DataAttrTable } from './data-attr-table'
import { EmitsTable } from './emits-table'
import { PropsTable } from './props-table'
import { types } from '.velite'

interface Props {
  id: string
}

export const ComponentTypes = (props: Props) => {
  const serverContext = getServerContext()
  const api = types.find(
    (type) => type.component === props.id && type.framework === serverContext.framework,
  )

  if (!api) {
    return null
  }

  return Object.entries(api.parts)
    .sort(([key]) => (key === 'Root' ? -1 : 1))
    .map(([key, types]) => (
      <Fragment key={key}>
        <Heading as="h3">{key}</Heading>
        <PropsTable properties={types.props} />
        <EmitsTable emits={types.emits} />
        <DataAttrTable component={props.id} part={key} />
      </Fragment>
    ))
}
