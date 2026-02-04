function UsingISR({ post }) {
  return (
    <ul>
      {/* {posts.map((post) => ( */}
        <li key={post.id}>{post.title}</li>
        <li key={post.id+"key"}>{post.generatedAt}</li>
      {/* ))} */}
    </ul>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({params}) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`)
  const post = await res.json()
  post.generatedAt = new Date().toLocaleString()
  console.log("Getting data for ", params.id)

  return {
    props: {
      post,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths(id) {
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  // const posts = await res.json()

  // const idVal = id.toString()
  // Get the paths we want to pre-render based on posts
  // const paths = posts.map((post) => ({
  //   params: { id: post.id.toString() },
  // }))
  const pathsList = [1, 2, 3, 4, 5]
  const paths = pathsList.map(path => ({
    params: {id: path.toString()}
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default UsingISR
