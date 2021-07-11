const SET_ONE_APPLICATION = "application/one_application";
const SET_ALL_APPLICATIONS = 'application/all_applications';

export const add_one_application = (status,applicant, url_link,company,job_title,job_description,address,priority)=>async(dispatch)=>{
    const response = await fetch("/api/application/new",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status,applicant, url_link,company,job_title,job_description,address,priority
        }),
    });
    const data = await response.json();
    if(!data.errors){
        return [data.id,data.status];

    }else{
        return null
    }
}
export const edit_application = (id, status,applicant, url_link,company,job_title,job_description,address,priority)=>async(dispatch)=>{
    const response = await fetch(`/api/application/edit/${id}`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status,applicant, url_link,company,job_title,job_description,address,priority
        }),
    });
    const data = await response.json();
    if(!data.errors){
        return [data.id,data.status];

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

export const get_all_applications = (userId) => async(dispatch) =>{
    console.log("INSIDE STORE")
    const response = await fetch(`/api/application/all/${userId}`);
    if(response.ok){
        const data = await response.json();
        if(data["error"] == 'no apps'){
            return false;
        }
        console.log('ALL APPLICATIONS',data)
        dispatch(setAllApplications(data))
    }else{
        console.log('APP GET ERRORS',response.errors)
    }
    return true;
}

const setOneApplication = (application) => ({
    type:SET_ONE_APPLICATION,
    payload:application
})

const setAllApplications = (applications) =>({
    type:SET_ALL_APPLICATIONS,
    payload:applications
})

export const moveStatus = ( newStatus,applicationId, userId) => async(dispatch)=>{
    console.log(newStatus,applicationId, userId)
    const response = await fetch(`/api/application/status/${userId}/${applicationId}/${newStatus}`);
    if(response.ok) {
        const data = await response.json();
        dispatch(get_all_applications(userId))
        return data;
    }else{
        console.log("MOVE STATUS ERRORS");
    }
}

export const deleteApp = (appId)=> async (dispatch) => {
    const response = await fetch(`/api/application/delete/${appId}`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else {
        return {"error":"no auth"}
    }
}

const initialState = {one_application:{}, staging_apps:[], applied_apps:[], in_contact_apps:[], interviewing_apps:[]}

export default function application (state = initialState, action)  {
    switch(action.type) {
        case SET_ONE_APPLICATION:
            return {...state, one_application:action.payload};
        case SET_ALL_APPLICATIONS:
            const set_staging_apps = [];
            const set_applied_apps = [];
            const set_in_contact_apps = [];
            const set_interviewing_apps = [];
            for(let key in action.payload){
                if(action.payload[key].status === 1){
                    set_staging_apps.push(action.payload[key])
                }else if(action.payload[key].status ==2 ){
                    set_applied_apps.push(action.payload[key])
                }else if(action.payload[key].status == 3){
                    set_in_contact_apps.push(action.payload[key])
                }else if(action.payload[key].status == 4){
                    set_interviewing_apps.push(action.payload[key])
                }
            }
            return {...state,
                staging_apps:set_staging_apps,
                applied_apps:set_applied_apps,
                in_contact_apps:set_in_contact_apps,
                interviewing_apps: set_interviewing_apps
            };
        default:
        return state;
    }
}
