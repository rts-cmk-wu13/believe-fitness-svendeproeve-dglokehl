import Link from "next/link";
import type { FitnessClass, UserRole } from "@/app/api/types"
import { LuSquarePen, LuTrash } from "react-icons/lu";
import SignupButton from "../buttons/SignupButton";

type ProfileFitnessClassCardProps = {
    fitnessClass: FitnessClass;
    userRole: UserRole;
    userId: string;
    className?: string;
}

export default function ProfileFitnessClassCard({ fitnessClass, userRole, userId, className }: ProfileFitnessClassCardProps) {
    console.log("fitnessClass:", fitnessClass)

    return (
        <article className={`p-5 space-y-2.5 border border-app-grey-medium rounded-3xl ${className ? className : ""}`}>
            <h2 className="text-2xl font-semibold">{fitnessClass.className}</h2>
            <p className="capitalize">{fitnessClass.classDay} - {fitnessClass.classTime}</p>

            {userRole === "default" && (
                <div className="flex justify-between">
                    <Link href={`/classes/${fitnessClass.id}`} className="button-app-default px-6">Show Class</Link>
                    <SignupButton className="button-app-default px-6" isSignedUp userRole={userRole} classId={fitnessClass.id} />
                    {/* <button className="button-app-default px-6">Leave</button> */}
                </div>
            )}
            {userRole === "admin" && (
                <>
                    <div>
                        <p>Max. participants: {fitnessClass.maxParticipants}</p>
                        {/* <p>Joined: {fitnessClass.users.length}</p> */}
                    </div>
                    <div className="flex justify-between items-center">
                        <Link href={`/profile/classes/${fitnessClass.id}/participants`} className="button-app-default px-6">Participants</Link>

                        <div className="flex items-center gap-2.5">
                            <Link href={`/profile/classes/${fitnessClass.id}/edit`} className="button-app-default size-12 p-3 *:size-full"><LuSquarePen /></Link>
                            <Link href={`/profile/classes/${fitnessClass.id}/delete`} className="button-app-default size-12 p-3 *:size-full"><LuTrash /></Link>
                        </div>
                    </div>
                </>
            )}
        </article>
    )
}