import Link from 'next/link'

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href='/about'>
            <span>About</span>
          </Link>
        </li>
        <li>
          <Link href='/blog'>
            <span>Blog</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Nav
