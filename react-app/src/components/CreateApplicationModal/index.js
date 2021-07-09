import React, { useState } from 'react';
import { Modal } from '../Modal';
import CreateApplication from '../CreateApplication'
function CreateApplicationModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create App</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateApplication />
        </Modal>
      )}
    </>
  );
}

export default CreateApplicationModal;
