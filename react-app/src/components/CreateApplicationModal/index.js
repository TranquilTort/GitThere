import React, { useState } from 'react';
import { Modal } from '../Modal';
import CreateApplication from '../CreateApplication'
function CreateApplicationModal({showModal, setShowModal}) {

  return (
    <>
      <button id="add-application-button" onClick={() => setShowModal(true)}>Add Application</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateApplication showModal={showModal} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateApplicationModal;
