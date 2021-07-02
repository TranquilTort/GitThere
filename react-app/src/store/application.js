const ADD_APPLICATION = "application/add_application";

export const add_one_application = (appObj)=>async(dispatch)=>{
    const response = await fetch("api/application/add",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

        }),
    });
    const data = await response.json();
    return data;

}
