
export const myApplicationsPromise = async  (email,accessToken) => {

  return await fetch(`https://career-code-beta.vercel.app/applications?email=${email}`
    , {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  }
////////s  
).then(res=>res.json());
}