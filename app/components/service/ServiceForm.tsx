import { DraftServiceForm } from "@/src/schemas"

type ServiceFormProps = {
    service?: DraftServiceForm
}

export default function ServiceForm({service} : ServiceFormProps) {
    return (
        <>
            <div className="mb-5">
                <label htmlFor="name" className="text-sm uppercase font-bold">
                    Nombre
                </label>
                <input
                    id="name"
                    className="w-full p-3  border border-gray-100  bg-white"
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    defaultValue={service?.name}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Descripcion
                </label>
                <input
                    id="description"
                    className="w-full p-3  border border-gray-100  bg-white"
                    type="text"
                    placeholder="Descripcion"
                    name="description"
                    defaultValue={service?.description}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="duration_minutes" className="text-sm uppercase font-bold">
                    Duración en minutos
                </label>
                <input
                    id="duration_minutes"
                    className="w-full p-3  border border-gray-100 bg-white"
                    type="number"
                    placeholder="Duración en minutos"
                    name="duration_minutes"
                    defaultValue={service?.duration_minutes}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="price" className="text-sm uppercase font-bold">
                    Precio
                </label>
                <input
                    id="price"
                    className="w-full p-3  border border-gray-100 bg-white"
                    type="number"
                    placeholder="Precio"
                    name="price"
                    defaultValue={service?.price}
                />
            </div>
            
        </>
    )
}