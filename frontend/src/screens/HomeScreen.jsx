// import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
// import axios from 'axios';

const HomeScreen = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(()=>{
//     const fetchProducts = async () => {
//       const {data} = await axios.get('api/products');
//       setProducts(data);
//     }
//     fetchProducts();
//   }, []) //This hook is triggered whenever the second parameter changes (an empty array [] in this case indicates that this trigger is to be triggered once the page is refreshed)

  //const {data: products, isLoading, error} = useGetProductsQuery(); --> Before pagination
  const {pageNumber,keyword} = useParams();
  const {data, isLoading, error} = useGetProductsQuery({keyword, pageNumber});

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
    {isLoading ? (
      <h2><Loader/></h2>
    ) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message> ) : (
      <>
      <h1>Latest Products</h1>
      <Row>
        {data.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col> //On small screen only one product shows up in one row (12/12) & on large screen its 3 (12/4) and so on
        ))}
      </Row>
      <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}/>
    </>
    )}

    </>
  );
};
export default HomeScreen;
