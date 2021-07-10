import React, { useState } from 'react';
import { Modal } from '../Modal';
import CreateApplication from '../CreateApplication'
function CreateApplicationModal({showModal, setShowModal}) {

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create App</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateApplication showModal={showModal} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateApplicationModal;
