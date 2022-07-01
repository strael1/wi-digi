import Cart from '../../assets/images/cart.png';
import Dropdown from '../../assets/images/dropdown.png';
import Logo from '../../assets/images/logo.png';
// import Cart from '../../assets/images/cart.png';
// import Dropdown from '../../assets/images/dropdown.png';
// import Logo from '../../assets/images/logo.png';

const Header = () => {
    return(
        <header className="header">
            <div className="container main-header">
                <div>
                    <img src={Dropdown} alt={Dropdown} />
                </div>
                <div>
                    <img src={Logo} alt={Logo} />
                </div>
                <div>
                    <img src={Cart} alt={Cart} />
                </div>
            </div>

            <div className='bottom-line'></div>
        </header>
    )
}

export default Header;