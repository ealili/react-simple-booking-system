import {Table} from "react-bootstrap";
import {useState} from "react";
import {getBookings} from "../services/BookingService";

function formatDateString(dateString) {
    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleString('de-CH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    });

    return formattedDate;
}

function ListBookings() {
    const [bookings, setBookings] = useState([])


    const fetchBookings = async () => {
        try {
            const response = await getBookings()
            setBookings(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useState(() => {
        fetchBookings()
    }, [])

    return (
        <>
            <Table responsive striped bordered className={'resources-table'}>
                <tbody>
                <tr>
                    <th>Id</th>
                    <th>Resource</th>
                    <th>Booked Quantity</th>
                    <th>Date From</th>
                    <th>Date To</th>
                </tr>
                {
                    bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>
                                {booking.id}
                            </td>
                            <td>
                                {booking.resource.name}
                            </td>
                            <td>
                                {booking.bookedQuantity}
                            </td>
                            <td>
                                {formatDateString(booking.fromDateTime)}
                            </td>
                            <td>
                                {formatDateString(booking.toDateTime)}
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </>
    )
}


export default ListBookings;