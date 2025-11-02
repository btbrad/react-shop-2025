import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import './style.scss'
import { createPortal } from 'react-dom'

export interface ModalType {
  showMessage: (message: string) => void
}

const Modal = forwardRef<ModalType>((props, ref) => {
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')
  const divElement = useRef<HTMLDivElement>(document.createElement('div'))

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

  useEffect(() => {
    const divNode = divElement.current
    if (showModal) {
      document.body.appendChild(divNode)
    } else {
      if (divNode.parentElement) {
        document.body.removeChild(divNode)
      }
    }
    return () => {
      if (divNode.parentElement) {
        document.body.removeChild(divNode)
      }
    }
  }, [showModal])

  return createPortal(
    <div className="modal">
      <div className="modal-text">{message}</div>
    </div>,
    divElement.current
  )
})

export default Modal
