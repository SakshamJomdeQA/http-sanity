export default function UsingSSR({ time }) {
  return (
    <main>
      <h1>SSR Caching with Next.js</h1>
      <time dateTime={time}>{time}</time>
    </main>
  )
}

export async function getServerSideProps({ req, res }) {
  console.log("from getServerSideProps")

  return {
    props: {
      time: new Date().toISOString(),
    },
  }
}
