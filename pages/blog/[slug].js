import { getPostBySlug, getAllSlugs } from 'lib/api'
import { extractText } from 'lib/extract-text'
import Meta from 'components/meta'
import Container from 'components/container'
import PostHeader from 'components/post-header'
import PostBody from 'components/post-body'
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar
} from 'components/two-column'
import ConvertBody from 'components/convert-body'
import PostCategories from 'components/post-categories'
import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import { getImageBuffer } from 'lib/getlmageBuffer'
import { eyecatchLocal } from 'lib/constants'

const Post = ({
  title,
  publish,
  content,
  eyecatch,
  categories,
  description
}) => {
  return (
    <Container>
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch.url}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.heigth}
      />
      <article>
        <PostHeader title={title} subtitle='Blog Article' publish={publish} />
        <figure>
          <Image
            src={eyecatch.url}
            alt=''
            layout='responsive'
            width={eyecatch.width}
            height={eyecatch.height}
            sizes='(min-width: 1152px) 1152px, 100vw'
            priority
            placeholder='blur'
            blurDataURL={eyecatch.blurDataURL}
          />
        </figure>
        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>
      </article>
    </Container>
  )
}
export default Post

const getStaticPaths = async () => {
  const allSlugs = await getAllSlugs()
  return {
    paths: allSlugs.map(({ slug }) => `/blog${slug}`),
    fallback: false
  }
}
export { getStaticPaths }

const getStaticProps = async context => {
  const slug = context.params.slug
  const post = await getPostBySlug(slug)
  const description = extractText(post.content)
  const eyecatch = post.eyecatch ?? eyecatchLocal
  const imageBuffer = await getImageBuffer(eyecatch.url)
  const { base64 } = await getPlaiceholder(imageBuffer)
  eyecatch.blurDataURL = base64

  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch,
      categories: post.categories,
      description
    }
  }
}
export { getStaticProps }
