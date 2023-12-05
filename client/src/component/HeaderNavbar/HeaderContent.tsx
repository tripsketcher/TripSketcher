import { withoutAuthHeaderContent } from '../../router'
import { NavLink } from 'react-router-dom'

import cs from 'classnames'
import styles from './HeadNavbar.module.scss'

// TODO: User 정보에 따라서 보여주는 정보가 달라져야 한다.
interface HeaderContentProps {
  handleHeaderClose?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

//   헤더 컨텐츠에 따라 리스트 보여주기
//  - 반응형 사이즈에 따라 Navbar에서 보여주거나 Modal을 통해서 보여줘야 한다.
const HeaderContent = ({ handleHeaderClose }: HeaderContentProps) => {
  const headerContentInfo = withoutAuthHeaderContent

  console.log(headerContentInfo)
  //    헤더 컨텐츠에 따라 리스트 보여주기
  //    - 반응형 사이즈에 따라 Navbar에서 보여주거나 Modal을 통해서 보여줘야 한다.
  return (
    <ul className={styles.navItemList}>
      {headerContentInfo &&
        headerContentInfo.map((content) => {
          let path = content.path === '/map/:type' ? '/map/create' : content.path

          return (
            <li className={styles.navItem} key={`${content.label}-header`}>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? cs(styles.navLink, styles.active) : styles.navLink
                }}
                to={path}
                onClick={handleHeaderClose}
              >
                <p>{content.label}</p>
              </NavLink>
            </li>
          )
        })}
    </ul>
  )
}

export default HeaderContent
