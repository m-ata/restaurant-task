interface Reservation {
    id: number,
    businessDate: string,
    status: string,
    shift: string,
    start: string,
    end: string,
    quantity: number,
    customer: {
        firstName: string,
        lastName: string,
    },
    area: string,
    guestNotes: string,
}

interface MenuOptions { label: string; value: string | number }
