"use client"

import axios from "axios"
import { useState } from "react"

/*
"queued": queued,
"running": running,
"failed": failed,
"succeeded": succeeded,
"other": other,
*/Home
export default function Home() {
  const [runners, setRunner] = useState<[] | null>(null);
  const [jobStats, setJobStats] = useState<{ queued: number, running: number, other: number, failed: number, succeeded: number } | null>(null);
  const [connectedRunners, setConnectedRunners] = useState<[] | null>(null);

  if (jobStats == null) {
    axios.request(
      { withCredentials: true, method: "get", url: "https://ci.yiff.day/api/jobs/stats" }
    ).then((response) => {
      if (response.data) {
        setJobStats(response.data)
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  if (runners == null && connectedRunners == null) {
    axios.request(
      { withCredentials: true, method: "get", url: "https://ci.yiff.day/api/runners/all" }
    ).then((response) => {
      if (response.data.runners) {
        //let runners = JSON.parse(response.data.runners);
        setRunner(response.data.runners)
      }
      if (response.data.connected) {
        //let connected_runners = JSON.parse(response.data.connected);
        setConnectedRunners(response.data.connected)
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <main className="flex flex-col gap-2">
      <header className="p-3">
        <div className="flex flex-col gap-2 border-b-8 border-amber-500">
          <h1 className="font-header text-5xl font-thin">Channel Ci</h1>
          <p className="text-2xl font-medium">There are <span className="text-green-500">{connectedRunners?.length}</span> runners connected and <span className="text-amber-500">{runners?.length}</span> total runners.</p>
          {jobStats == null ?
            null
            :
            <p className="text-2xl font-medium pb-4">There have been <span className="text-red-500">{jobStats.failed}</span> failed jobs, <span className="text-green-500">{jobStats.succeeded}</span> jobs that succeeded, and <span className="text-amber-500">{jobStats.queued}</span> queued jobs. There are <span className="text-orange-500">{jobStats.running}</span> jobs running.</p>
          }
        </div>
      </header>
      <div className="flex flex-col gap-2">
        <div className="bg-secondary w-full">
          <div className="p-3 flex flex-col gap-2">
            <h3 className="text-4xl font-semibold border-b-8 border-b-box-background max-w-max">Runners</h3>
            {runners == null ?
              <p>runners have not loaded yet...</p>
              :
              <ul className="flex flex-col gap-2 max-w-sm w-full p-2">
                {runners.map((runner) => (
                  <div key={runner["id"]} className="bg-box-background p-2 border-2 border-box-background hover:border-amber-500 hover:cursor-pointer">
                    <h5 className="text-3xl">{runner["name"]} <span className="text-xl">(#{runner["id"]})</span> {connectedRunners !== null ? connectedRunners.includes(runner["id"]) ? <span className="text-green-500 text-xl">- connected</span> : null : null}</h5>
                    No current job
                  </div>
                ))}
              </ul>
            }
          </div>
        </div>
        <div className="bg-box-background w-full">
          <div className="p-3 flex flex-col gap-2">
            <h3 className="text-4xl font-semibold border-b-8 border-b-pink-500 max-w-max">Jobs</h3>
            <a href="/jobs" className="max-w-max text-yellow-500 text-xl underline">If you'd like to see jobs please view the jobs page for now :)</a>
          </div>
        </div>
      </div>
    </main>
  )
}
