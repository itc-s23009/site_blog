import styles from 'styles/posts.module.css'
import Link from 'next/link'

const Posts = ({ posts }) => {
  return (
    <div className={styles.gridContainer}>
      {posts.map(({ title, slug }) => (
        <article className={styles.post} key={slug}>
          <Link href={`/blog/${slug}`}>
            <span>
              <h2>{title}</h2>
            </span>
          </Link>
        </article>
      ))}
    </div>
  )
}
export default Posts