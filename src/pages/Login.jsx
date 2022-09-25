import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btnDisabled: true,
      name: '',
      loading: false,
    };
  }

onInputChange = ({ target: { value } }) => {
  const validName = value.length;
  const MIN_LENGTH_VALUE = 3;
  this.setState({
    name: value,
    btnDisabled: validName < MIN_LENGTH_VALUE,
  });
}

onBtnClick = async () => {
  this.setState({ loading: true });
  const { name } = this.state;
  const { history } = this.props;
  await createUser({ name });
  this.setState({
    loading: false,
  });
  history.push('/search');
}

render() {
  const { name, btnDisabled, loading } = this.state;
  return (
    loading
      ? <Loading />
      : (
        <div data-testid="page-login">
          <form>
            <input
              data-testid="login-name-input"
              className="inputName"
              placeholder="inserir seu nome..."
              type="text"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
            />
            <button
              data-testid="login-submit-button"
              className="btnInputName"
              placeholder="seu nome..."
              type="button"
              name="btnInputName"
              value={ btnDisabled }
              disabled={ btnDisabled }
              onClick={ this.onBtnClick }
            >
              Entrar
            </button>
          </form>
        </div>
      )
  );
}
}

export default Login;

Login.propTypes = {
  history: PropTypes.array,
}.isrequired;
