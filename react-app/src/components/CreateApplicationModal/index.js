import React, { useState } from 'react';
import { Modal } from '../Modal';
import CreateApplication from '../CreateApplication'
function CreateApplicationModal({colors,showModal, setShowModal,setAppId,setAppDisplayStatus,setShowAppModal}) {
  return (
    <>
      <button id="add-application-button" onClick={() => setShowModal(true)}
        style={{
          color:`${colors[0].mainFontColor}`,
          background:`linear-gradient(90deg, ${colors[1].dark} 20%, ${colors[2].dark} 70%,  ${colors[4].dark} 90%)`
        }}
        onMouseEnter={e=>{
          e.target.customMouseOverKey = true;
          let count = 20;
          let bounces = 0;
          let colorsArray = [colors[1].dark, colors[2].dark,,colors[4].dark]
          const interval = setInterval(()=>{
            bounces %2 ===0? count--: count++;
            e.target.style.background=`linear-gradient(90deg, ${colorsArray[0]} ${count-50}%,  ${count}%, ${colorsArray[1]} ${count+50}%,  ${colorsArray[3]} ${count+100}%)`
            if(count===60 || count=== -60){
                bounces +=1
            }
            if(!e.target.customMouseOverKey || bounces === 25){
              clearInterval(interval);
            }
          },10)
          }
        }
        onMouseLeave={e=>{
          e.target.customMouseOverKey = false;
          e.target.style.background=`linear-gradient(90deg, ${colors[1].dark} 20%, ${colors[2].dark} 70%,  ${colors[4].dark} 90%)`

        }}
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
