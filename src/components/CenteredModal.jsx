import {Button, Modal} from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import {useEffect, useState} from "react";
import {createBooking} from "../services/BookingService";

function formatToCustomString(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}


export default function CenteredModal(props) {
    const [dateFrom, onChangeDateFrom] = useState(new Date(Date.now()));
    const [dateTo, onChangeDateTo] = useState();
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const [message, setMessage] = useState({})
    const [disabled, setIsDisabled] = useState(false)


    useEffect(() => {
        setMessage({});
    }, [props.show]);

    const onSubmit = async (e) => {
        e.preventDefault()

        if (dateTo <= dateFrom) {
            setMessage({
                text: 'Date To should be larger than Date From',
                type: 'error-message'
            });
            return;
        }

        setIsDisabled(true);

        const payload = {
            fromDateTime: formatToCustomString(new Date(dateFrom)),
            toDateTime: formatToCustomString(new Date(dateTo)),
            bookedQuantity: selectedQuantity,
            resourceId: props.resource.id
        }

        try {
            const response = await createBooking(payload)

            setMessage({text: response.data.message, type: 'success-message'});
        } catch (error) {
            const {response} = error;
            setMessage({text: response.data.message, type: 'error-message'});
        } finally {
            setTimeout(() => {
                setIsDisabled(false);
            }, 1000);
        }
    }

    const handleQuantityChange = (event) => {
        setSelectedQuantity(parseInt(event.target.value, 10));
    };

    return (<Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <form onSubmit={onSubmit}>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Booking at <b><i>{props.resource ? props.resource.name : ''}</i></b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <span>Date From</span>
                    <span style={{float: 'right'}}>
            <DateTimePicker minDate={new Date(Date.now().toFixed())} onChange={onChangeDateFrom}
                            value={dateFrom}/>
          </span>
                </div>
                <br/>
                <div>
                    <span>Date To</span>
                    <span style={{float: 'right'}}>
            <DateTimePicker minDate={new Date(Date.now())} onChange={onChangeDateTo}
                            value={dateTo} required/>
          </span>
                </div>
                <div>
                    <br/>
                    <span>Quantity</span>
                    <span style={{float: 'right'}}>
            <input
                style={{width: '70px'}}
                type="number"
                value={selectedQuantity}
                onChange={handleQuantityChange}
            />
          </span>
                </div>
                <br/>
                {message && (
                    <div className={`modal-message ${message.type}`}>
                        {message.text}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button className={'btn-danger'} onClick={props.onHide}>Close</Button>
                <Button className={'btn-success'} type={'submit'} disabled={disabled}>
                    Book
                </Button>
            </Modal.Footer>
        </form>
    </Modal>);
}