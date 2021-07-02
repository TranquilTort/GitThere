const SET_ONE_APPLICATION = "application/one_application";

export const add_one_application = (applicant, url_link,company,job_title,job_description,address,priority)=>async(dispatch)=>{
    const response = await fetch("/api/application/new",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            applicant, url_link,company,job_title,job_description,address,priority
        }),
    });
    const data = await response.json();
    if(!data.errors){
        return data.id;

    }else{
        return null
    }
}
export const get_one_application = (appId) => async(dispatch) =>{
    const response = await fetch(`/api/application/one/${appId}`);
    if(response.ok){
        const data = await response.json();
        dispatch(setOneApplication(data))
    }
}

const setOneApplication = (application) => ({
    type:SET_ONE_APPLICATION,
    payload:application
})

const initialState = {one_application:{}}

export default function application (state = initialState, action)  {
    switch(action.type) {
        case SET_ONE_APPLICATION:
            return {one_application:action.payload};
        default:
        return state;
    }
}
