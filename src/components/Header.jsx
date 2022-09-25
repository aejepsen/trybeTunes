import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.usedName();
  }

  usedName = async () => {
    const response = await getUser();
    this.setState({
      name: response.name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      loading
        ? <Loading />
        : (
          <header data-testid="header-component">
            <h1 data-testid="header-user-name">{ name }</h1>
            <div>
              <Link to="/search" data-testid="link-to-search">Search</Link>
            </div>
            <div>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </div>
            <div>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </div>
          </header>
        )
    );
  }
}

export default Header;
