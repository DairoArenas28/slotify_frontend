import AddServiceButton from "@/app/components/service/AddServiceButton";
import CardService from "@/app/components/service/CardService";

export default function Service() {
    
    return (
        <>
            <div className="flex-row">
                <div className="flex justify-end items-end my-5">
                    <AddServiceButton />
                </div>
                <div>
                    <CardService />
                </div>
            </div>
        </>
    )
}