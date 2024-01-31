import { client } from 'lib/api'

const Schedule = () => {
  return <h1>記事のタイトル</h1>
}
export default Schedule

const getStaticProps = async () => {
  const resPromise = client.get({
    endpoint: 'blogs'
  })
  try {
    const res = await resPromise
    console.log(res)
  } catch (err) {
    console.log(err)
  }

  return {
    props: {}
  }
}
export { getStaticProps }
