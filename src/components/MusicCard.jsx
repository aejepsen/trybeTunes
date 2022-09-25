import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      loading: false,
    };
  }

  componentDidMount = async () => {
    const { favoritas } = this.props;
    const { musicAlbum } = this.props;
    if (favoritas) {
      this.setState({
        checked: favoritas.some((fav) => fav.trackId === musicAlbum.trackId),
      });
    }
  };

  onChecked = async () => {
    const { checked } = this.state;
    const { musicAlbum, handleFavorites } = this.props;
    this.setState({
      checked: !checked,
      loading: true,
    });

    if (!checked) {
      await addSong(musicAlbum);
      await handleFavorites();
      this.setState({
        loading: false,
      });
    } else {
      await removeSong(musicAlbum);
      await handleFavorites();
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { checked, loading } = this.state;
    return (
      loading
        ? <Loading />
        : (
          <div>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor={ `checkbox-music-${trackId}` }>
              Favorita
              <input
                id={ `checkbox-music-${trackId}` }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                value={ trackId }
                onChange={ this.onChecked }
                checked={ checked }
              />
            </label>
          </div>
        ));
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicAlbum: PropTypes.objectOf.isRequired,
  favoritas: PropTypes.arrayOf.isRequired,
  handleFavorites: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
};

export default MusicCard;
