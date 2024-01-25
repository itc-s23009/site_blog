import Link from 'next/link'
import styles from 'styles/logo.module.css'

const Logo = ({ boxOn = false }) => {
  return (
    <Link href='/'>
      <span className={boxOn ? styles.box : styles.basic}>CUBE</span>
    </Link>
  )
}
export default Logo
