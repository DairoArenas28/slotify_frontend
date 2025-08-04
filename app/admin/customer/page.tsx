import AddCustomerButton from "@/app/components/customer/AddCustomerButton";
import { CardCustomer } from "@/app/components/customer/CardCustomer";
import ModalContainer from "@/app/components/ui/ModalContainer";

export default function CustomerPage() {
    
    return (
        <>
            <div className="flex-row">
                <div className="flex justify-end items-end my-5">
                    <AddCustomerButton />
                </div>
                <div>
                    <CardCustomer />
                </div>
                <ModalContainer />
            </div>
        </>
    )
}