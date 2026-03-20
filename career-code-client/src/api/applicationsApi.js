export const myApplicationsPromise =  (email) => {
  return  fetch(`http://localhost:3000/applications?email=${email}`
    /////e
    , {
    credentials: 'include'
  }
////////s  
).then(res=>res.json());
}