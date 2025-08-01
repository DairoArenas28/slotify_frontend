import { getUser } from "@/src/services/user";
import UserMenu from "./UserMenu";


export async function CardUser() {

    const users = await getUser()

    return (
        <>
            <ul className="divide-y divide-gray-200 rounded-lg border border-gray-300 shadow-xl bg-white">
                {users && users.map((user) => (
                    <li key={user.id} className="flex justify-between items-center p-6 hover:bg-gray-50 transition duration-200">
                    <div className="flex flex-col items-start gap-4">
                        <p className="text-2xl font-bold text-[#A65F60]">
                            {user.name}
                        </p>
                        <p className="text-lg font-semibold text-[#A3B18A]">
                            {user.email}
                        </p>
                        <p className="text-sm text-gray-500">
                            {user.role === "admin" ? "Administrador" : "Cliente"}
                        </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-6">
                        < UserMenu
                            userId={user.id}
                        />
                    </div>
                </li>
                ))}
            </ul>
        </>
    )
}