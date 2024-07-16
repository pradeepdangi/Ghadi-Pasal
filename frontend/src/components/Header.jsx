import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import FilterBox from './FilterBox';
import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';
import { resetWish } from '../slices/wishSlice';
// import { WishList } from './wish-list';

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlists);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      dispatch(resetWish());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar expand='lg' collapseOnSelect style={{ backgroundColor: '#F9E9DE ' }}>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='GhadiPasal' />
              GhadiPasal
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <FilterBox />
              {/* <WishList/> */}
              <LinkContainer to='/wist'>
                <Nav.Link>
                  <FaHeart fill='#808A96' />

                  {wishlistItems?.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
