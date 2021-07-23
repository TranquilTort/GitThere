import React, { useState } from 'react';
import { Modal } from '../Modal';
import CreateApplication from '../CreateApplication'
function CreateApplicationModal({colors,showModal, setShowModal,setAppId,setAppDisplayStatus,setShowAppModal}) {
  return (
    <>
      <button id="add-application-button" onClick={() => setShowModal(true)}
        style={{
          color:`${colors[0].mainFontColor}`,
          background:`linear-gradient(90deg, ${colors[1].dark} 50%, ${colors[2].dark} 70%,  ${colors[4].dark} 90%)`
        }}
        onMouseEnter={e=>{e.target.style.background=`linear-gradient(90deg, ${colors[1].dark} 25%, ${colors[2].dark} 50%,  ${colors[4].dark} 70%)`}}
        onMouseLeave={e=>{e.target.style.background=`linear-gradient(90deg, ${colors[1].dark} 50%, ${colors[2].dark} 70%,  ${colors[4].dark} 90%)`}}
      >Add Application</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateApplication showModal={showModal} setShowAppModal={setShowAppModal} setShowModal={setShowModal} setAppId={setAppId} setAppDisplayStatus={setAppDisplayStatus}/>
        </Modal>
      )}
    </>
  );
}

export default CreateApplicationModal;
// background: rgb(114,183,116);
// background: radial-gradient(circle, ${colors[4].dark} 0%, ${colors[1].dark} 56%);
