import React, { Suspense } from 'react'
import ApplicationStats from './ApplicationStats'
import ApplicationList from './ApplicationList'
import useAuth from '../../hooks/useAuth'
import { myApplicationsPromise } from '../../api/applicationsApi';

export default function MyApplications() {

const {user} = useAuth();

  return (
    <div>
      <ApplicationStats></ApplicationStats>
    <Suspense fallback={'loading your applications'}>
            <ApplicationList
            myApplicationsPromise={myApplicationsPromise(user.email)}
            ></ApplicationList>
    </Suspense>
    </div>
  )
}
