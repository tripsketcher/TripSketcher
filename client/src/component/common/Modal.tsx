import React from 'react'

import cs from 'classnames'
import { MdClose } from 'react-icons/md'

import styles from './Modal.module.scss'
import headerStyles from '../HeaderNavbar/HeaderModal.module.scss'

interface ModalProps {
  children: React.ReactNode
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  modalType: string
}

const Modal = ({ setIsOpen, children, modalType }: ModalProps) => {
  const handleModalClose = () => {
    setIsOpen(false)
  }

  return (
    <div className={modalType}>
      {/* 모달 content 외부분 => 음영 처리를 위해 사용되는 element */}
      <div className={styles.modalMask} onClick={handleModalClose}></div>
      {/* 모달 헤더 및 content, 닫기 버튼등이 children으로 넘어온다. */}
      <div className='modalContent'>
        {children}
        <button className='closeButton' onClick={handleModalClose}>
          <MdClose />
          <p className={styles.hidden}>모달 닫기 버튼</p>
        </button>
      </div>
    </div>
  )
}

export default Modal
