import React, { Suspense } from 'react'
import useAuth from '../../hooks/useAuth';
import {  } from "module";
import JobList from './JobList';
import { jobsCreatedByPromise } from '../../api/jobsApi';

export default function MyPostedJobs() {
  const {user} = useAuth();
  return (
    <div>
      <h2>My posted Jobs: </h2>
      
      <Suspense>
      <JobList jobsCreatedByPromise={jobsCreatedByPromise(user.email)}></JobList>
      </Suspense>
      
    </div>
  )
}
