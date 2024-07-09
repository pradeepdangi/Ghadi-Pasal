import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { useGetFilterProductQuery } from '../slices/productsApiSlice';

const FilterPage = () => {
  const { pageNumber, category, sort } = useParams();

  const { data, isLoading, error } = useGetFilterProductQuery({
    category,
    sort,
    pageNumber,
  });

  return (
    <>
      {!category || !sort ? (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      ) : null}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error || 'Something went wrong.'}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data && data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {data && (
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={`${category}-${sort}`}
            />
          )}
        </>
      )}
    </>
  );
};

export default FilterPage;
