import { MDCRipple } from "@material/ripple";
import artistsTemplate from "./Artists.html";
import { MusicService } from "../../services/MusicService";

export class ArtistsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.state = {
      artists: []
    };
  }

  querySelectors() {
    this.cardRipple = this.mountPoint.querySelectorAll(".artists__ripple");
  }

  initMaterial() {
    Array.from(this.cardRipple).forEach(item => {
      // eslint-disable-next-line no-new
      new MDCRipple(item);
    });
  }

  fetchArtistsData() {
    MusicService.getAuthors().then(artists => {
      this.state.artists = artists;
      this.mount(false);
    });
  }

  mount(shouldFetchData = true) {
    if (shouldFetchData) {
      this.fetchArtistsData();
    }
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return artistsTemplate(this.state);
  }
}
