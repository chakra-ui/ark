import React from 'react'
import { ComponentOverviewCard } from './ComponentOverviewCard'
import { useGetOverviewComponents } from './use-overview-components'

export const ComponentOverview = () => {
  const components = useGetOverviewComponents()

  return (
    <div>
      {components.map(({ title, url, imageUrl }) => (
        <ComponentOverviewCard key={url} title={title} url={url} slug={url} imageUrl={imageUrl} />
      ))}
    </div>
  )
}
