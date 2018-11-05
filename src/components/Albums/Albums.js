import { MDCRipple } from "@material/ripple";

import albumsTemplate from "./Albums.html";
import { MusicService } from "../../services/MusicService";

export class AlbumsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.state = {
      isFetching: false,
      albums: []
    };
  }

  querySelectors() {
    this.albumRipplePoint = this.mountPoint.querySelectorAll(
      ".albums__card-ripple-effect"
    );
  }

  initMaterial() {
    Array.from(this.albumRipplePoint).forEach(el => {
      this.albumRipplePoint = new MDCRipple(el);
    });
  }

  fetchAlbumsCollectionData() {
    this.state.isFetching = true;
    MusicService.getAlbums().then(albums => {
      this.state.albums = albums;
      this.state.isFetching = false;
      this.mount(false);
    });
  }

  mount(shouldFetchData = true) {
    if (shouldFetchData) {
      this.fetchAlbumsCollectionData();
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return albumsTemplate(this.state);
  }
}
