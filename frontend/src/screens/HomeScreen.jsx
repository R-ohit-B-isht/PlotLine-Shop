import { useState,useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useGetServicesQuery } from '../slices/servicesApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Service from '../components/Service';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();


  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: productsData, error: productsError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const { data: servicesData, error: servicesError } = useGetServicesQuery({
    keyword,
    pageNumber,
  });

  useEffect(() => {
    if (productsData && servicesData) {
      setData({ products: productsData, services: servicesData });
      setIsLoading(false);
    }
    if (productsError || servicesError) {
      setError(productsError || servicesError);
      setIsLoading(false);
    }
  }, [productsData, servicesData, productsError, servicesError]);
  // console.log(data.products,data.services)
  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products?.products?.length!==0 ? data.products.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            )) : <h3>No Products Found</h3>
          }
          </Row>
          <h1>Service Providers</h1>
          <Row>
            {data.services?.services?.length!==0 ? data.services.services.map((service) => (
              <Col key={service._id} sm={12} md={6} lg={4} xl={3}>
                <Service service={service} />
              </Col>
            ))
            : <h3>No Service Provider Found</h3>
            }
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
