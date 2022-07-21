import '../App.css';

const Modal = ({ handleClose, show, children, targetButton, deleteAllPhotos, removePhoto }) => {
    
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const deletePhoto = targetButton === 'Delete All' ? deleteAllPhotos : removePhoto;

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <div className="modalButtonDiv">
            <button type="button" className='close-button' onClick={handleClose}> No </button>
            <button type='button' className='accept-button' onClick={deletePhoto} >Yes</button>
          </div>
        </section>
      </div>
    );
}

export default Modal
