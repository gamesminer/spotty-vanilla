import { FirebaseService } from "./FirebaseService";

const database = FirebaseService.database();

export class MusicService {
  static getAlbums() {
    return database
      .ref("albums")
      .once("value")
      .then(snapshot => Object.values(snapshot.val()).map(child => child));
  }

  static getAuthors() {
    return database
      .ref("authors")
      .once("value")
      .then(snapshot => Object.values(snapshot.val()).map(child => child));
  }

  static getAuthorSongs(authorId) {
    return database
      .ref(`authors/${authorId}`)
      .once("value")
      .then(author => {
        const songs = [];
        author.val().songs.forEach(songId =>
          database
            .ref(`songs/${songId}`)
            .once("value")
            .then(song => songs.push(song.val()))
        );
        return songs;
      });
  }

  static getAlbumSongs(albumId) {
    return database
      .ref(`albums/${albumId}`)
      .once("value")
      .then(album => {
        const songs = [];
        album.val().songs.forEach(songId =>
          database
            .ref(`songs/${songId}`)
            .once("value")
            .then(song => songs.push(song.val()))
        );
        return songs;
      });
  }
}
