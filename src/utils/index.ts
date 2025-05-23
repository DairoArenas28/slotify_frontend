
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

