import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import HeaderContent from './HeaderContent'

import styles from './HeadNavbar.module.scss'
import enjoyTripLogo from '../../assets/ssafy_logo.png'
import { HiMenuAlt2 } from 'react-icons/hi'

import { windowSizeType } from '../../types/header'
import { getCurrentWindowSizeType } from '../../utils/layout'
import HeaderModal from './HeaderModal'
import HeaderAuth from './HeaderAuth'

const HeadNavbar = () => {
  const [windowSizeType, setWindowSizeType] = useState<windowSizeType>(getCurrentWindowSizeType())
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 헤더가 마운트시 size 값 설정 핸들러 등록 언마운트일 때 제거
  useEffect(() => {
    const resizeListener = () => {
      setWindowSizeType(getCurrentWindowSizeType())
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  // event handlers
  const handleHeaderOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsModalOpen(true)
  }

  return (
    <header className={styles.headerNavbar}>
      <nav className={styles.navbar}>
        <div className={styles.navbarToggleButton}>
          <button type='button' onClick={handleHeaderOpen}>
            <HiMenuAlt2 />
            <p className={styles.hidden}>네비게이션 토글 버튼</p>
          </button>
        </div>
        <NavLink to='/' className={styles.navbarLogo}>
          <img src={enjoyTripLogo} className='rounded mx-auto d-block' alt='로고 이미지' />
        </NavLink>
        {!isModalOpen && <HeaderContent />}
        {windowSizeType !== 'mobile' && <HeaderAuth />}
      </nav>
      {/* 모달 */}
      {isModalOpen && <HeaderModal windowSizeType={windowSizeType} setIsModalOpen={setIsModalOpen} />}
    </header>
  )
}

export default HeadNavbar
