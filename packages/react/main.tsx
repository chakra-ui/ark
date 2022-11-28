import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  NavLink,
  RouterProvider,
  useLoaderData,
} from 'react-router-dom'
import './index.css'

const storyModules = import.meta.glob('./src/**/*.stories.tsx')
const stories = Object.fromEntries(
  Object.entries(storyModules).map(([path, storyModule]) => {
    const componentName = path.split('/').at(-1)?.split('.').at(0)
    return [componentName, storyModule] as const
  }),
)

const ComponentLinks = () => {
  const links = Object.entries(stories).map(([componentName], index) => (
    <li key={index} className="component-links__list-item">
      <NavLink to={`/story/${componentName}`} className="component-links__link">
        {componentName}
      </NavLink>
    </li>
  ))

  return (
    <nav className="component-links">
      <ul className="component-links__list">{links}</ul>
    </nav>
  )
}

interface StoryRendererProps {
  storyModule: Record<string, React.ElementType>
  componentName: string
}

function StoryRenderer({ storyModule, componentName }: StoryRendererProps) {
  const stories = Object.entries(
    storyModule || { 'Not found': () => <h3>such empty space</h3> },
  ).map(([storyName, StoryComponent], index) => (
    <section key={index} className="story">
      <header className="story__header">
        <h2 className="story__title">{storyName}</h2>
      </header>
      <div className="story__wrapper">
        <StoryComponent />
      </div>
    </section>
  ))

  return (
    <div className="story-renderer">
      <aside className="story-renderer__sidebar">
        <ComponentLinks />
      </aside>
      <main className="story-renderer__container">
        <header className="story-renderer__header">
          <h1 className="story-renderer__title">{componentName}</h1>
        </header>
        <div className="story-renderer__content">{stories}</div>
      </main>
    </div>
  )
}

const StoryRouteRenderer = () => {
  const storyModuleTuple = useLoaderData() as
    | [string, Record<string, React.ElementType>]
    | undefined

  if (!storyModuleTuple) {
    return <h1>404</h1>
  }

  const [componentName, storyModule] = storyModuleTuple
  return <StoryRenderer componentName={componentName} storyModule={storyModule} />
}

const router = createBrowserRouter([
  {
    element: <StoryRouteRenderer />,
    path: 'story/:storyName',
    loader: async ({ params }) => {
      if (!params.storyName) return
      const storyThunk = stories[params.storyName]
      return [params.storyName, await storyThunk?.()]
    },
  },
  {
    element: <Navigate to="/story/accordion" />,
    path: '*',
  },
])

const App = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(<App />)
}
