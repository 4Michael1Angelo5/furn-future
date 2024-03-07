import React , { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



const GalleryModal = (props) => {
  
    const {className = "gallery-modal"} = props
     
      const title = props.product.name

      const galleryImages = props.product.galleryImages.nodes ; 

      const toggle = props.toggle

      const [activeImg , setImg] = useState(props.product.image.sourceUrl);

  return(
        <Modal center isOpen={props.modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}> { title } </ModalHeader>
            <ModalBody>

               <img src = {activeImg} width = "100%"/>
                <div className = "row">
                {
                    galleryImages.map( (item,index) => {
                        return(
                            <div key = {index} className = "next-photo col-3">
                                <img onClick = {() => setImg(galleryImages[index].sourceUrl)} src = {item.sourceUrl} width = "100%"/>
                            </div>
                        );
                    })
                }
                </div>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
  );
}

export default GalleryModal