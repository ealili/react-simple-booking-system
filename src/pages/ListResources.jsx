import '../index.css';
import {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import CenteredModal from "../components/CenteredModal";
import {getResources} from "../services/ResourceService";


function ListResources() {
    const [resources, setResources] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);

    const fetchResources = async () => {
        try {
            const response = await getResources()
            setResources(response.data.data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchResources();
    }, [])

    const handleBookClick = (resource) => {
        setSelectedResource(resource);
        setModalShow(true);
    };

    return (
        <>
            <Table bordered striped responsive className={'resources-table'}>
                <tbody>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th></th>
                </tr>
                {
                    resources.map(resource => (
                        <tr key={resource.id}>
                            <td>
                                {resource.id}
                            </td>
                            <td>
                                {resource.name}
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <Button className={'btn btn-secondary btn-sm'} variant="primary"
                                        onClick={() => handleBookClick(resource)}>
                                    Book here
                                </Button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>

            <div>
                <CenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    resource={selectedResource}
                />
            </div>
        </>
    );
}

export default ListResources;
