import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Header from '../components/Header';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.renderUser();
  }

  renderUser = () => {
    this.setState({
      name: 'User Test',
      email: 'email@test.com',
      description: 'Lorem ipsum',
      loading: false,
    });
  };

  render() {
    const { name, email, description, loading } = this.state;
    return (
      loading
        ? <Loading />
        : (
          <div data-testid="page-profile">
            <Header />
            <div>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
            <div>
              <img
                data-testid="profile-image"
                src="url-to-image"
                alt="url-da-imagem"
                width="20"
                height="20"
              />
              <h1 data-testid={ ` ${name}` }>{ name }</h1>
              <h1 data-testid={ ` ${email}` }>{ email }</h1>
              <h1 data-testid={ ` ${description}` }>{ description }</h1>
            </div>
          </div>
        )
    );
  }
}

export default Profile;
