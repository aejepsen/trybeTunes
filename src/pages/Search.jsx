import React from 'react';
import SearchArtist from '../components/SearchArtist';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistAlbums: [],
      loading: false,
      btnDisabled: true,
      name: '',
    };
  }

  onInputChange = ({ target: { value } }) => {
    const inputLength = value.length;
    const MIN_LENGTH_VALUE = 2;
    this.setState({
      name: value,
      btnDisabled: inputLength < MIN_LENGTH_VALUE,
      artistInput: value,
      inputArtist: value,
    });
  }

  onBtnClick = async () => {
    const { artistInput } = this.state;
    const artist = await searchAlbumsAPI(artistInput);
    if (artist.length > 0) {
      this.setState({
        loading: false,
        artistAlbums: artist,
        artistInput: '',
      });
    }
  }

  render() {
    const {
      name,
      btnDisabled,
      loading,
      artistAlbums,
      artistInput,
      inputArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading
          ? <h2>Carregando...</h2>
          : (
            <div>
              <form>
                <input
                  data-testid="search-artist-input"
                  type="text"
                  name={ name }
                  value={ artistInput }
                  placeholder="Pesquisar artista"
                  onChange={ this.onInputChange }
                />
                <button
                  data-testid="search-artist-button"
                  type="button"
                  name="btnDisabled"
                  disabled={ btnDisabled }
                  onClick={ this.onBtnClick }
                >
                  Pesquisar
                </button>
              </form>
            </div>
          )}
        <SearchArtist
          artistAlbums={ artistAlbums }
          inputArtist={ inputArtist }
        />
      </div>
    );
  }
}

export default Search;
