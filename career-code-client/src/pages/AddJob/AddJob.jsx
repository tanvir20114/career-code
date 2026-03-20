import React from 'react'
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AddJob() {

    const {user} = useAuth();

    const handleAddAJob = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        //process salary range data
        const {min,max,currency, ...newJob} = data;
        newJob.salaryRange = {min,max,currency}
        //process requirements
        const requirementsString = newJob.requirements;
     const requirementsDirty = requirementsString.split(',');
      const requirementsClean = requirementsDirty.map(req=>req.trim());
        newJob.requirements=requirementsClean;

        //process responsibilities
        newJob.responsibilities=newJob.responsibilities.split(',').map(res=>res.trim());

        newJob.status = "active";
        console.log(newJob);

        axios.post('http://localhost:3000/jobs',newJob).then(res => {
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "This new Job has been saved and published.",
              showConfirmButton: false,
              timer:1500
            })
          }

        }).catch(error=>{console.log(error)});
    }

  return (
    <div>
      <h2>Please add a job</h2>
      <form onSubmit={handleAddAJob}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend className="fieldset-legend">Basic Info</legend>

  <label className="label">Job Title</label>
  <input type="text" className="input" name='title' placeholder="Job Title" />

  <label className="label">Company</label>
  <input type="text" name='company' className="input" placeholder="Company Name" />

  <label className="label">Location</label>
  <input type="text" name='location' className="input" placeholder="Company Location" />

   <label className="label">Company logo</label>
  <input type="text" name='company_logo' className="input" placeholder="Company Logo URL" />

</fieldset>

 <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend className="fieldset-legend">Job Type</legend>
<div className="filter">
  <input className="btn filter-reset" type="radio" name="JobType" aria-label="All"/>
  <input className="btn" type="radio" name="JobType" value="On-Site" aria-label="On-Site"/>
  <input className="btn" type="radio" name="JobType" value="Remote" aria-label="Remote"/>
  <input className="btn" type="radio" name="JobType" value="Hybrid" aria-label="Hybrid"/>
</div>
  
</fieldset>

 <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend className="fieldset-legend">Job Category</legend>

  <select defaultValue="Job Category" name='category' className="select">
  <option disabled={true}>Job Category</option>
  <option>Engineering</option>
  <option>Marketing</option>
  <option>Finance</option>
</select>

  
</fieldset>

 <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend className="fieldset-legend">Application Deadline</legend>
<input type="date" name="deadline" className="input" />
  
</fieldset>

<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend className="fieldset-legend">Salary Range</legend>

 <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
    <div>
         <label className="label">Minimum Salary</label>
  <input type="text" name='min' className="input" placeholder="Minimum Salary" />
    </div>

<div>
      <label className="label">Maximum Salary</label>
  <input type="text" name='max' className="input" placeholder="Maximum Salary" />

</div>

  <div>
    <label className="label">Currency</label>
<select defaultValue="Select a Currency" name='currency' className="select">
  <option disabled={true}>Select a Currency</option>
  <option>BDT</option>
  <option>USD</option>
  <option>EU</option>
</select>
  </div>
 </div>
</fieldset>

<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend className="fieldset-legend">Job Description</legend>
<textarea className="textarea" name="description" placeholder="Job Description"></textarea>
  
</fieldset>

<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend className="fieldset-legend">Job Requirements</legend>
<textarea className="textarea" name="requirements" placeholder="Requirements (separate by comma)"></textarea>

  
</fieldset>

<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend className="fieldset-legend">Job Responsibilities</legend>
<textarea className="textarea" name="responsibilities" placeholder="Responsibilities (separate by comma)"></textarea>

  
</fieldset>

 <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend className="fieldset-legend">HR Related Info</legend>

  <label className="label">HR Name</label>
  <input type="text" className="input" name='hr_name' placeholder="HR Name" />

  <label className="label">HR Email</label>
  <input type="email" name='hr_email' defaultValue={user.email} className="input" placeholder="HR Email" />

  <input type="submit" value="Add Job" className='btn' />

</fieldset>

  

      </form>
    </div>
  )
}
