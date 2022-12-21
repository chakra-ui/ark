import Link from 'next/link'

export default function Page(props) {
  const { params } = props
  return (
    <>
      <h1>Hello, Next.js!</h1>
      <p>Framnework: {params.framework}</p>
      <p>Componetn: {params.component}</p>
      <Link href="/dashboard">Dashboard</Link>
    </>
  )
}

// export async function generateStaticParams() {
//   const posts = await getPosts()

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }
