export const jobsCreatedByPromise = async (email) =>{
    return await fetch(`http://localhost:3000/jobs/applications?email=${email}`).then(res=>res.json());
}