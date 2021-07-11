import React, { useState } from 'react';
import { Modal } from '../Modal';
function EditApplicationModal({setShowEditModal}) {
    return (
    <>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <div> HIIIIIIIIII</div>
        </Modal>
      )}
    </>
  );
}

export default EditApplicationModal;
