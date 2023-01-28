// window.onload=function(){
//     console.log("testing")
//     let btn = document.createElement("BUTTON");
//     btn.innerText="essuuu"
//     document.body.appendChild(btn);
// }
console.log("EXTENTION LOADED")

let btn = document.createElement("BUTTON");
let container = document.createElement("DIV");
container.className = "git-there-button-container";
btn.className = "testing-class"
btn.innerText="Add A Resume"
btn.addEventListener("click",()=>{
    console.log("click on btn!")
});
document.body.appendChild(btn);
