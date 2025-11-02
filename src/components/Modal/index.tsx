import { forwardRef, useImperativeHandle, useState } from 'react'
import './style.scss'

export interface ModalType {
  showMessage: (message: string) => void
}

const Modal = forwardRef<ModalType>((props, ref) => {
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')

  useImperativeHandle(
    ref,
    () => {
      return {
        showMessage(message: string) {
          setMessage(message)
          setShowModal(true)
          setTimeout(() => {
            setShowModal(false)
          }, 2000)
        },
      }
    },
    []
  )

  return (
    showModal && (
      <div className="modal">
        <div className="modal-text">{message}</div>
      </div>
    )
  )
})

export default Modal
