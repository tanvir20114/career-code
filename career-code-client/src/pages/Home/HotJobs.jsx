import React, { use } from 'react'
import JobCard from '../Shared/JobCard';

export default function HotJobs({jobsPromise}) {
    const jobs = use(jobsPromise);
  return (
    <div><h2 className='text-4xl text-center'>Hot Jobs of the Day</h2>
<div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4'>
    {
        jobs.map(job=><JobCard key={job._id} job={job}></JobCard>)
    }
    </div>    </div>
  )
}
