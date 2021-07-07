const SET_ALL_NOTES = 'notes/all_notes'

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
        set_all_notes(data)
    }

}

const set_all_notes = (notes) =>({
    type: SET_ALL_NOTES,
    payload:notes
})

const initialState = {notes:{}}

export default function note (state=initialState, action) {
    switch (action.type) {
        case SET_ALL_NOTES:
            return {...state, notes:action.payload}
        default:
            return state;
    }
}
