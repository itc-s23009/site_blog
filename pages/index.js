import { getAllPosts } from 'lib/api'
import Meta from 'components/meta'
import Container from 'components/container'
import Posts from 'components/posts'
import Pagination from 'components/pagination'
import { getPlaiceholder } from 'plaiceholder'
import { getImageBuffer } from 'lib/getlmageBuffer'
import { eyecatchLocal } from 'lib/constants'

import Hero from 'components/hero'
const Home = ({ posts }) => {
  return (
    <Container>
      <Meta />
      <Hero title='CUBE' subtitle='アウトプットしていくサイト' imageOn />
      <Posts posts={posts} />
      <Pagination nextUrl='/blog' nextText='More Posts' />
    </Container>
  )
}
export default Home

const getStaticProps = async () => {
  const posts = await getAllPosts()

  for (const post of posts) {
    if (!Object.prototype.hasOwnProperty.call(post, 'eyecatch')) {
      post.eyecatch = eyecatchLocal
    }
    const imageBuffer = await getImageBuffer(post.eyecatch.url)
    const { base64 } = await getPlaiceholder(imageBuffer)
    post.eyecatch.blurDataURL = base64
  }

  return {
    props: {
      posts
    }
  }
}
export { getStaticProps }
