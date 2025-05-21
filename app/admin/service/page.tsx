import AddServiceButton from "@/app/components/service/AddServiceButton";
import CardService from "@/app/components/service/CardService";
import ModalContainer from "@/app/components/ui/ModalContainer";

export default function ServicePage() {
    
    return (
        <>
            <div className="flex-row">
                <div className="flex justify-end items-end my-5">
                    <AddServiceButton />
                </div>
                <div>
                    <CardService />
                </div>
                <ModalContainer />
            </div>
        </>
    )
}