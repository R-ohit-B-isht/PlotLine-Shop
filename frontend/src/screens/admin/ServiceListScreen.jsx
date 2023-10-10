import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetServicesQuery,
  useDeleteServiceMutation,
  useCreateServiceMutation,
} from '../../slices/servicesApiSlice';
import { toast } from 'react-toastify';

const ServiceListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetServicesQuery({
    pageNumber,
  });
  const [deleteService, { isLoading: loadingDelete }] =
    useDeleteServiceMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteService(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createService, { isLoading: loadingCreate }] =
    useCreateServiceMutation();

  const createServiceHandler = async () => {
    if (window.confirm('Are you sure you want to create a new service?')) {
      try {
        await createService();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Services</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createServiceHandler}>
            <FaPlus /> Create Service
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>AVAILABILITY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.services.map((service) => (
                <tr key={service._id}>
                  <td>{service._id}</td>
                  <td>{service.name}</td>
                  <td>${service.price}</td>
                  <td>{service.category}</td>
                  <td>{service.available ? 'Available':'Unavailable'}</td>
                  <td>
                    <LinkContainer to={`/admin/service/${service._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(service._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ServiceListScreen;
