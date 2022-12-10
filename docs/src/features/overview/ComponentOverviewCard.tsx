import React from 'react'

export type ComponentOverviewCardProps = {
  url: string
  title: string
  slug: string
  imageUrl: string
}

export const ComponentOverviewCard = ({ url, title, imageUrl }: ComponentOverviewCardProps) => (
  <a role="group" href={url}>
    <div>
      {imageUrl ? (
        <div>
          <img src={imageUrl} alt={title} />
        </div>
      ) : null}
      <p>{title}</p>
    </div>
  </a>
)
