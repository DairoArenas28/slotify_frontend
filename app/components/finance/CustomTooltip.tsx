
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'; // para tipar `value` y `name`

type TypeProps = TooltipProps<ValueType, NameType>;

const CustomTooltip = ({ active, payload, label }: TypeProps) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
        <div className="bg-white border border-gray-300 shadow-md p-3 rounded text-sm">
            <p className="font-semibold">Día: {label}</p>
            <p className="text-blue-600">
                Ingresos: ${Number(payload?.[0]?.value ?? 0).toFixed(2)}
            </p>
        </div>
    );
};

export default CustomTooltip;