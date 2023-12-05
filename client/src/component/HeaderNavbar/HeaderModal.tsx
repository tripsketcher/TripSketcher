import React from 'react'
import { createPortal } from 'react-dom'

import Modal from '../common/Modal'
import HeaderAuth from './HeaderAuth'
import HeaderContent from './HeaderContent'

import { windowSizeType } from '../../types/header'

import styles from './HeaderModal.module.scss'
import { MdClose } from 'react-icons/md'

interface ModalProps {
  windowSizeType: windowSizeType
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderModal = ({ windowSizeType, setIsModalOpen }: ModalProps) => {
  const handleHeaderClose = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    setIsModalOpen(false)
  }

  return (
    <>
      {createPortal(
        <Modal setIsOpen={setIsModalOpen} modalType={styles.headerModal}>
          {
            <>
              {windowSizeType === 'mobile' && <HeaderAuth />}
              <HeaderContent handleHeaderClose={handleHeaderClose} />
            </>
          }
        </Modal>,
        document.body
      )}
    </>
  )
}

export default HeaderModal
