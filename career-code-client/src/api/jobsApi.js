
export const jobsCreatedByPromise = async (email,accessToken) =>{
    
    return await fetch(`https://career-code-beta.vercel.app/jobs/applications?email=${email}`
         , {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  }
    ).then(res=>res.json());
}