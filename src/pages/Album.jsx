import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      favoritas: [],
      albumInfos: {
        artistName: '',
        albumName: '',
      },
      loading: true,
    };
  }

  componentDidMount= () => {
    this.getMusics();
    this.handleFavorites();
  }

  getMusics= async () => {
    const { match: { params: { id } } } = this.props;
    const results = await getMusics(id);
    const newResults = results.slice(1);
    this.setState({
      musics: [...newResults],
      albumInfos: {
        artistName: results[0].artistName,
        albumName: results[0].collectionName,
      },
    });
  }

  handleFavorites= async () => {
    const favoritas = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoritas,
    });
  };

  render() {
    const { musics, albumInfos: { artistName, albumName }, favoritas } = this.state;
    const { checked, loading } = this.state;
    return (
      loading
        ? <Loading />
        : (
          <div data-testid="page-album">
            <Header />
            <h2 data-testid="artist-name">{ artistName }</h2>
            <h2 data-testid="album-name">{ albumName }</h2>
            {musics.map((music) => {
              const { trackName, previewUrl, trackId } = music;
              if (music.previewUrl === undefined) {
                return null;
              }
              return (
                <MusicCard
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  trackId={ trackId }
                  key={ trackName }
                  musicAlbum={ music }
                  onChange={ this.onChecked }
                  checked={ checked }
                  favoritas={ favoritas }
                  handleFavorites={ this.handleFavorites }
                />
              );
            })}
          </div>
        )
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
