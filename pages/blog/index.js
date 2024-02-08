import { getAllPosts } from 'lib/api'
import Meta from 'components/meta'
import Container from 'components/container'
import Hero from 'components/hero'
import Posts from 'components/posts'

const Blog = ({ posts }) => {
  return (
    <Container>
      <Meta pageTitle='ブログ' pageDesc='ブログの記事一覧' />

      <Hero title='Blog' subtitle='Recent Posts' />

      <Posts posts={posts} />
    </Container>
  )
}
export default Blog

const getStaticProps = async () => {
  const posts = await getAllPosts()

  return {
    props: {
      posts
    }
  }
}
export { getStaticProps }
