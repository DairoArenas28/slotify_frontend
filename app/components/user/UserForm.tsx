


export function UserForm() {
    return (
        <>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >Nombre</label>
                <input
                    type="name"
                    placeholder="Nombre de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="name"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="email"
                />
            </div>

            <div className="flex flex-row gap-2">
                <div className="flex-1">
                    <label
                        className="font-bold text-2xl"
                    >Password</label>
                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="password"
                    />
                </div>
                <div className="flex ">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-8 py-2 px-4 rounded">
                        Generar
                    </button>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}