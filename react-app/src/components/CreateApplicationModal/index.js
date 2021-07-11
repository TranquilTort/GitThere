import React, { useState } from 'react';
import { Modal } from '../Modal';
import CreateApplication from '../CreateApplication'
function CreateApplicationModal({showModal, setShowModal,setAppId,setAppDisplayStatus,setShowAppModal}) {
  return (
    <>
      <button id="add-application-button" onClick={() => setShowModal(true)}>Add Application</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateApplication showModal={showModal} setShowAppModal={setShowAppModal} setShowModal={setShowModal} setAppId={setAppId} setAppDisplayStatus={setAppDisplayStatus}/>
        </Modal>
      )}
    </>
  );
}

export default CreateApplicationModal;
