import Image from "next/image";

export default function BrandLogo() {
    return (
        <Image 
            src="/brandLogo.svg" 
            alt="Romantic Rose Spa de Uñas"
            width={25} 
            height={25} 
            className="w-full"
            priority
        />
    );
}