import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      btnDisabled: true,
    };
  }

  onInputChange = () => {
    const { name, email, description, image } = this.state;
    const validName = name.length;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);
    const validDescription = description.length;
    const validImage = image.length;
    const MLV = 1;
    this.setState({
      name,
      email,
      description,
      image,
      btnDisabled:
        !validName < MLV
        || !validEmail
        || !validDescription < MLV
        || !validImage < MLV,
    });
  }

  render() {
    const { name, email, description, image, btnDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div data-testid="header-user-name"> </div>
        <form data-testid="profile-form">
          <div className="form-group">
            <label htmlFor="name">
              Nome
              <input
                data-testid="edit-input-name"
                className="inputName"
                placeholder="Nome"
                type="text"
                name="name"
                value={ name }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                placeholder="Email"
                data-testid="edit-input-email"
                type="text"
                id="email"
                value={ email }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <textarea
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="imagem">
              Imagem
              <input
                data-testid="edit-input-image"
                type="file"
                value={ image }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              data-testid="edit-button-save"
              type="submit"
              disabled={ btnDisabled }
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
