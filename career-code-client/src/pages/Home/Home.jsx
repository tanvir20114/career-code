import React, { Suspense } from 'react'
import Banner from './Banner'
import HotJobs from './HotJobs'

export default function Home() {
  const jobsPromise = fetch('https://career-code-beta.vercel.app/jobs').then(res=>res.json());
  return (
    <div>
      <h2>This is home</h2>
      <Banner></Banner>
      <Suspense fallback={'Loading hot jobs'}>
              <HotJobs jobsPromise={jobsPromise}></HotJobs>
      </Suspense>
    </div>
  )
}
