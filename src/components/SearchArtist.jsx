import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';

class SearchArtist extends React.Component {
  render() {
    const { loading, artistAlbums, inputArtist } = this.props;
    return (
      <div>
        { loading && <Loading /> }
        { artistAlbums.length > 0
          ? (
            <div>
              <h3>
                {`Resultado de álbuns de: ${inputArtist}`}
              </h3>
              {artistAlbums.map((item) => (
                <div key={ item.collectionId }>
                  <h1>{ item.collectionName }</h1>
                  <img src={ item.artworkUrl100 } alt={ item.collectionName } />
                  <Link
                    to={ `/album/${item.collectionId}` }
                    data-testid={ `link-to-album-${item.collectionId}` }
                  >
                    album
                  </Link>
                </div>
              ))}
            </div>
          ) : <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default SearchArtist;

SearchArtist.propTypes = {
  loading: PropTypes.bool,
  artistName: PropTypes.string,
  inputArtist: PropTypes.string,
  artistAlbums: PropTypes.array,
}.isrequired;
