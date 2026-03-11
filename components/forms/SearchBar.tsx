"use client"

import { LuSearch } from "react-icons/lu";

type SearchBarProps = {
    query?: string;
    className?: string;
}

export default function SearchBar({ query, className }: SearchBarProps) {
    const submitSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
        const q = e.currentTarget.q.value.trim()
        if (!q) {
            e.preventDefault()
        }
    }

    return (
        <div>
            <form action="" noValidate onSubmit={submitSearch} className={`w-full flex items-center relative ${className ? className : ""}`}>
                <input
                    type="search"
                    name="q" id="q"
                    defaultValue={query ? query : ""}
                    placeholder="Search classes"
                    className="form-input pl-12! peer"
                />
                <button className="absolute left-5 z-2 text-app-grey-medium peer-focus:text-app-black">
                    <LuSearch className="size-4 hover-75" />
                </button>
            </form>
        </div>
    )
}