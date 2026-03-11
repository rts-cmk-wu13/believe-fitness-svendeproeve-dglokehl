import type { User } from "@/app/api/types"
import { IoPerson } from "react-icons/io5";

type UserCardProps = {
    user: User;
    className?: string;
}

export default function UserCard({ user, className }: UserCardProps) {
    return (
        <div className={`flex items-center gap-3.5 ${className ? className : ""}`}>
            <figure className="p-3.5 size-16 *:size-full bg-app-yellow rounded-full">
                <IoPerson />
            </figure>

            <div>
                <p className="text-lg font-medium">{user.userFirstName} {user.userLastName}</p>
                <p className="text-sm">
                    {user.role === "default" && "Member"}
                    {user.role === "admin" && "Instructor"}
                </p>
            </div>
        </div>
    )
}