import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritas: [],
      loading: true,
      checked: false,
    };
  }

    componentDidMount = () => {
      this.onChecked();
      this.handleFavorites();
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
      const { musicAlbum } = this.props;
      this.setState({
        checked: !checked,
        loading: false,
      });

      if (!checked) {
        await addSong(musicAlbum);
        this.setState({
          loading: false,
        });
      } else {
        await removeSong(musicAlbum);
        this.setState({
          loading: false,
        });
      }
    };

  handleFavorites= async () => {
    const favoritas = await getFavoriteSongs();
    this.setState({
      loading: false,
      checked: true,
      favoritas,
    });
  };

  render() {
    const { favoritas, loading, checked } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>Músicas Favoritas</h2>
        {
          loading
            ? <Loading />
            : (
              <div>
                {favoritas.map((music) => (
                  <MusicCard
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId }
                    key={ music.trackId }
                    musicAlbum={ music }
                    favoritas={ favoritas }
                    onChange={ this.onChecked }
                    checked={ checked }
                    handleFavorites={ this.handleFavorites }
                  />
                ))}
              </div>
            )
        }
      </div>
    );
  }
}

Favorites.propTypes = {
  trackId: PropTypes.number.isRequired,
  musicAlbum: PropTypes.objectOf.isRequired,
  favoritas: PropTypes.arrayOf.isRequired,
};

export default Favorites;
