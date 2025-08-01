import ModalContainer from "@/app/components/ui/ModalContainer";
import AddUserButton from "@/app/components/user/AddUserButtom";
import { CardUser } from "@/app/components/user/CardUser";


export default function UserPage() {
    return (
        <div className="flex-row">
            <div className="flex justify-end items-end my-5">
                <AddUserButton />
            </div>
            <div>
                <CardUser />
            </div>
            <ModalContainer />
        </div>
    )
}