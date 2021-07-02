const ADD_APPLICATION = "application/add_application";

export const add_one_application = (applicant, url_link,company,job_title,job_description,address)=>async(dispatch)=>{
    const response = await fetch("/api/application/new",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            applicant, url_link,company,job_title,job_description,address
        }),
    });
    const data = await response.json();
    return data;

}
