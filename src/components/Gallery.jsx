import getPhotoUrl from 'get-photo-url';
import { useEffect, useState } from 'react';
import { db } from '../dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import loader from '../assets/loader.svg';
import Modal from './Modal';

const Gallery = () => {
  // const [allPhotos, setAllPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [targetButton, setTargetButton] = useState();

  const allPhotos = useLiveQuery(() => db.gallery.reverse().toArray(), []);
  
  // useEffect(() => {
  //   const getPhotosFromDb = async () => {
  //       const allPhotosFromDb = await db.gallery.toArray();
  //       console.log('infoor', allPhotosFromDb)
  //       allPhotosFromDb && setAllPhotos(allPhotosFromDb)
  //   }
  //   getPhotosFromDb()
  // },[])

  const addPhoto = async () => {
    // const newPhoto = {
    //   id: Date.now(),
    //   url: await getPhotoUrl('#addPhotoInput'),
    // }

    db.gallery.add({ 
      url: await getPhotoUrl('#addPhotoInput'),
    })

    // setAllPhotos([newPhoto, ...allPhotos]);
  }

  const showModalHandler = (e) => {
    setTargetButton(e.target.innerText);
    // console.log(targetButton)
    setShowModal(true)
  };
  
  const hideModalHandler = () => {
    setShowModal(false)
  };

  const removePhoto = (id) => {
      db.gallery.delete(id)
      setShowModal(false)

  }

  const deleteAllPhotos = () => {
    db.gallery.clear();
    setShowModal(false)
  }

  return (
    <>
        <Modal show={showModal} handleClose={hideModalHandler} targetButton={targetButton} removePhoto={() => removePhoto(() => this.id)} deleteAllPhotos={deleteAllPhotos}>
          <h1>ooops !!!</h1>
          <p>Are you sure you want to {targetButton} photo(s)</p>
        </Modal>
      <input type="file" name="photo" id="addPhotoInput" />
      <label htmlFor="addPhotoInput" onClick={addPhoto} title="Add Photo">
        <i className="add-photo-button fas fa-plus-square" />
      </label>
      {allPhotos?.length > 0 && <button className="delete-all-button" onClick={showModalHandler}>Delete All</button>}
      
      <section className="gallery">        
        {!allPhotos && <img src={loader} alt="loading....." />}
        {allPhotos?.length <= 0 && <p style={{textAlign:'center'}}>No data found</p>}

        {allPhotos?.map(photo => (
          <div className="item" key={photo.id}>
            <img src={photo.url} className="item-image" alt="any" />
            <button className="delete-button" onClick={showModalHandler}>Delete</button>
        </div>
        ))}
      </section>
    </>
  )
}

export default Gallery
