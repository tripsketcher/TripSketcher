import React from 'react'
// import Navbar from './Navbar'
import HeadNavbar from '../component/common/HeadNavbar'

import styles from './GeneralLayout.module.scss'

interface GeneralLayoutProps {
  children: React.ReactNode
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <>
      <HeadNavbar />
      <main className={styles.mainContainer}>{children}</main>
    </>
  )
}

export default GeneralLayout
