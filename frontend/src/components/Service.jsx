import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Service = ({ service }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/service/${service._id}`}>
        <Card.Img src={service.image} variant='top' style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
      </Link>

      <Card.Body>
        <Link to={`/service/${service._id}`}>
          <Card.Title as='div' className='service-title'>
            <strong>{service.name} ({service.category})</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={service.rating}
            text={`${service.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${service.price}/week</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Service;
