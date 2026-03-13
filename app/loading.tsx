import { CgSpinner } from "react-icons/cg";

export default function Loading() {
    return (
        <div className="h-dvh w-full flex justify-center items-center">
            <CgSpinner className="size-12 animate-spin" />
        </div>
    )
}