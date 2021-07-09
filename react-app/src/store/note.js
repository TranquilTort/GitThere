const SET_ALL_NOTES = 'note/all_notes'

export const add_one_note = (appId, title, body) => async (dispatch) => {
    const response = await fetch(`/api/note/add`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title,body,application_id:appId}),
    })
    const data = await response.json();
    if(data.errors) {
        return "error"
    }else{
        console.log("all notes in store",data)
        dispatch(set_all_notes(data))
    }

}
const set_all_notes = (notes) =>({
    type: SET_ALL_NOTES,
    payload:notes
})
export const get_all_notes = (appId) => async (dispatch) => {
    const response = await fetch(`/api/note/all/${appId}`)
    const data = await response.json();
    console.log("all notes",data)
    if(data.error){

    }
    dispatch(set_all_notes(data))
    return 200;
}
export const delete_note = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/note/delete/${noteId}`)
    const data = await response.json();
    return data;
}



const initialState = {notes:[]}

export default function note (state=initialState, action) {
    switch(action.type) {
        case SET_ALL_NOTES:
            const note_arr =[];
            for (let key in action.payload) {
                note_arr.push(action.payload[key])
            }
            return {...state, notes:note_arr}
        default:
            return state;
    }
}
