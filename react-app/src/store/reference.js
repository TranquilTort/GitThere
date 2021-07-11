const SET_ALL_REF ='ref/all_ref';

export const add_one_ref = (title,body,user_id) => async (dispatch) => {
    const response = await fetch(`api/reference/add`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title,body,user_id}),
    });
    const data = await response.json();
    if(data.errors) {
        return "error"
    }else {
        console.log("all refs in store",data)
        dispatch(set_all_refs(data))
    }
}

const set_all_refs = (refs) => ({
    type:SET_ALL_REF,
    payload:refs
})
export const get_all_refs = () => async (dispatch) => {
    const response = await fetch(`/api/reference/all`)
    const data = await response.json();
    console.log("all references",data)
    if(data.error){
        return "error"
    }
    dispatch(set_all_refs(data))
    return 200;
}
export const delete_ref = (refId) => async (dispatch) => {
    const response = await fetch(`/api/reference/delete/${refId}`)
    const data = await response.json();
    return data;
}

const initialState = {references:[]}

export default function reference (state=initialState, action) {
    switch(action.type) {
        case SET_ALL_REF:
            const ref_arr =[];
            for (let key in action.payload) {
                ref_arr.push(action.payload[key])
            }
            return {...state, references:ref_arr}
        default:
            return state;
    }
}
