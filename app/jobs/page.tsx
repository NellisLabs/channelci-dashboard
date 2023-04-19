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
    const [jobs, setJobs] = useState<[] | null>(null);

    if (jobs == null) {
        axios.request(
            { withCredentials: true, method: "get", url: "https://ci.yiff.day/api/jobs/all" }
        ).then((response) => {
            if (response.data.jobs) {
                setJobs(response.data.jobs)
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const showStatus = (status: number) => {
        switch (status) {
            case 0:
                return <span className="text-amber-500">Queued</span>
            case 1:
                return <span className="text-orange-500">Queued</span>
            case 2:
                return <span className="text-red-500">Failed</span>
            case 3:
                return <span className="text-green-500">Succeeded</span>
            default:
                return <span>Other?</span>
        }
    }

    return (
        <main className="flex flex-col gap-2">
            <header className="p-3">
                <div className="flex flex-col gap-2 border-b-8 border-pink-500 py-2">
                    <header className="flex flex-col gap-2">
                        <h1 className="font-header text-5xl font-thin">Jobs</h1>
                        <p className="text-xl font-medium">Showing {jobs?.length} jobs.</p>
                    </header>
                    <a href="/" className="max-w-max text-yellow-500 text-xl underline">Get outa here (go home)</a>

                    <ul className="flex flex-row gap-2">
                        <input className="bg-box-background p-1 px-2 max-w-lg w-full" placeholder="Search (e.g. status:queued runner:runner-1)"></input>
                        <button className="rounded-sm bg-amber-500 max-w-max text-black px-2 py-1 hover:bg-amber-700 outline-amber-500 outline-offset-2 active:outline active:outline-1">search jobs</button>
                    </ul>
                    <button className="rounded-sm bg-amber-500 max-w-max text-black px-2 py-1 hover:bg-amber-700 outline-amber-500 outline-offset-2 active:outline active:outline-1">you can also manually trigger a job (click me to see it!)</button>
                </div>
            </header>
            <div className="p-3">
                {jobs == null ?
                    <p>jobs are loading. be patient.</p>
                    :
                    <ul className="grid grid-cols-4 gap-2">
                        {jobs.map(job => (
                            <div onClick={(_) => window.location.href = `/jobs/${job["id"]}`} key={job["id"]} className="bg-box-background p-3 border-2 border-box-background hover:border-amber-500 hover:cursor-pointer">
                                <h5 className="text-2xl">Job # {job["id"]} - {showStatus(job["status"])}</h5>
                            </div>
                        ))}
                    </ul>
                }
            </div>
        </main>
    )
}
