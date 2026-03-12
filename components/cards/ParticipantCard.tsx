import type { User } from "@/app/api/types";
import { IoPerson } from "react-icons/io5";

type ParticipantCardProps = {
    user: User;
    className?: string;
}

export default function ParticipantCard({ user, className }: ParticipantCardProps) {
    return (
        <article className={`py-3 px-6 flex items-center gap-2.5 border border-app-black rounded-3xl ${className ? className : ""}`}>
            <IoPerson className="size-5" />
            <p className="text-lg">{user.userFirstName} {user.userLastName}</p>
        </article>
    )
}