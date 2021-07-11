import React, { useState } from 'react';
import { Modal } from '../Modal';
import EditApplication from "../EditApplication"
function EditApplicationModal({showEditModal, setShowEditModal,editStates}) {
    console.log('EDIT MODALLLLLLL')
    return (
    <>
      {showEditModal &&
        <Modal onClose={() => setShowEditModal(false)}>
          <EditApplication setShowEditModal = {setShowEditModal} editStates={editStates}/>
        </Modal>
      }
    </>
  );
}

export default EditApplicationModal;
