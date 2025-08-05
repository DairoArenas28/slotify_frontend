
export function formatCurrent(quantity: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(quantity)
}

export function formatDate(isoString: string) {
    const date = new Date(isoString)

    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',

    })

    return formatter.format(date)
}

export function getDateToday() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    const date = `${yyyy}-${mm}-${dd}`;

    const year = `${yyyy}-${mm}`;

    const month = `${yyyy}-${mm}`;

    const day = `${yyyy}-${mm}`;

    return {
        date,
        year,
        month,
        day
    }

}

export function formatHour(hour: string) {

    const [hours, minutes, seconds] = hour.split(":");

    const date = new Date();
    date.setHours(Number(hours), Number(minutes), Number(seconds));

    const hora = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(date);

    return hora

}

export function formatLocalDate(date: Date): string {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split("T")[0];
}

export function formatHumanDate(
    dateStr: string,
    separator: string = "-",
    mode: "full" | "monthYear" = "full",
    format: "DMY" | "YMD" = "DMY"
): string {
    const parts = dateStr.split(separator).map(Number);

    let day: number, month: number, year: number;

    if (format === "DMY") {
        [day, month, year] = parts;
    } else if (format === "YMD") {
        [year, month, day] = parts;
    } else {
        throw new Error("Formato de fecha no válido");
    }

    const date = new Date(year, month - 1, day); // mes empieza en 0

    if (isNaN(date.getTime())) return "Fecha inválida";

    const fullOptions: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    const monthYearOptions: Intl.DateTimeFormatOptions = {
        month: "long",
        year: "numeric",
    };

    const options = mode === "full" ? fullOptions : monthYearOptions;

    return date.toLocaleDateString("es-ES", options);
}

export function getLocalDateFromForm(formData: FormData, fieldName: string): Date | null {
    const raw = formData.get(fieldName)?.toString();
    if (!raw) return null;

    const [year, month, day] = raw.split("-").map(Number);

    if (!year || !month || !day) return null;

    // Construye la fecha como local (sin desfase horario)
    return new Date(year, month - 1, day);
}

