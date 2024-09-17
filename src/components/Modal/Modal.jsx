import './Modal.css'

export const Modal = ({ children, handleHide }) => {
  // Hide the modal if user clicks outside children:
  const handleClick = (event) => {
    if (event.currentTarget === event.target) {
      handleHide()
    }
  }

  return (
    <div className='modal' onClick={handleClick}>
      <div className='modal--content'>
        {children}
      </div>
    </div>
  )
}
