import React, { useState } from 'react';
import { Modal } from '../Modal';
import EditApplication from "../EditApplication"
function EditApplicationModal({showEditModal, setShowEditModal,editStates,setShowAppModal,setAppId,setAppDisplayStatus}) {
    console.log('EDIT MODALLLLLLL')
    return (
    <>
      {showEditModal &&
        <Modal onClose={() => setShowEditModal(false)}>
          <EditApplication setShowEditModal = {setShowEditModal} editStates={editStates} setShowAppModal={setShowAppModal} setAppId={setAppId} setAppDisplayStatus={setAppDisplayStatus}/>
        </Modal>
      }
    </>
  );
}

export default EditApplicationModal;
