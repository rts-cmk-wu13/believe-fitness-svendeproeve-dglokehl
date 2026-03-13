import Link from "next/link";
import type { FitnessClass, UserRole } from "@/app/api/types"
import { LuSquarePen, LuTrash } from "react-icons/lu";
import SignupButton from "../buttons/SignupButton";
import { fetchNoCache } from "@/app/api/fetches";

type ProfileFitnessClassCardProps = {
    classId: number;
    userRole: UserRole;
    className?: string;
}

export default async function ProfileFitnessClassCard({ classId, userRole, className }: ProfileFitnessClassCardProps) {
    const fitnessClass: FitnessClass = await fetchNoCache(`http://localhost:4000/api/v1/classes/${classId}`)
    // console.log("fitnessClass:", fitnessClass)

    return (
        <article className={`p-5 space-y-2.5 border border-app-grey-medium rounded-3xl ${className ? className : ""}`}>
            <h2 className="text-2xl font-semibold">{fitnessClass.className}</h2>
            <p className="capitalize">{fitnessClass.classDay} - {fitnessClass.classTime}</p>

            {userRole === "default" && (
                <div className="flex justify-between">
                    <Link href={`/classes/${fitnessClass.id}`} className="button-app-default px-6">Show Class</Link>
                    <SignupButton className="button-app-default px-6" isSignedUp isAllowed={true} userRole={userRole} classId={fitnessClass.id} />
                </div>
            )}
            {userRole === "admin" && (
                <>
                    <div className="flex justify-between">
                        <p>Max. participants: {fitnessClass.maxParticipants}</p>
                        <p>Joined: {fitnessClass.users.length}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <Link href={`/classes/${fitnessClass.id}/participants`} className="button-app-default px-6">Participants</Link>

                        <div className="flex items-center gap-2.5">
                            <Link href={`/classes/${fitnessClass.id}/edit`} className="button-app-default size-12 p-3 *:size-full"><LuSquarePen /></Link>
                            <Link href={`/classes/${fitnessClass.id}/delete`} className="button-app-default size-12 p-3 *:size-full"><LuTrash /></Link>
                        </div>
                    </div>
                </>
            )}
        </article>
    )
}