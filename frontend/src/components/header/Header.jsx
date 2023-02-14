import './header.scss';
import { Link } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
//import { useSelector } from 'react-redux';

const Header = () => {
  //const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className='full_header'>
      <div className='header'>
        <div className='logo'>
          Vintage Clothing<span>.</span>
        </div>
        <div className='right'>
          <ul>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <li className='item'>Home</li>
            </Link>
            <div class='vl'></div>
            <Link to={'/shop/all'} style={{ textDecoration: 'none' }}>
              <li className='item'>Shop</li>
            </Link>
            <div class='vl'></div>
            <Link to={'/about'} style={{ textDecoration: 'none' }}>
              <li className='item'>About Us</li>
            </Link>
            <div class='vl'></div>
            <Link to={'/contact'} style={{ textDecoration: 'none' }}>
              <li className='item'>Contact</li>
            </Link>
          </ul>
          <div className='search'>
            <input type='text' placeholder='Search' />
            <span>
              <SearchOutlinedIcon />
            </span>
          </div>
          <Link to='/cart'>
            <div className='btn_cart'>
              <button>
                <span className='icon'>
                  <ShoppingCartOutlinedIcon />
                </span>
                <span className='text'>2 Item(s)</span>
                {/* <span className='text'>{quantity} Item(s)</span> */}
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
