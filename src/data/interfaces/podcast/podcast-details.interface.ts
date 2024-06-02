export interface PodcastDetails {
    resultCount: number;
    results: PodcastResult[];
  }
  
  export type PodcastResult = Track | PodcastEpisode;
  
  export interface Track {
    wrapperType: "track";
    kind: "podcast";
    artistId: number;
    collectionId: number;
    trackId: number;
    artistName: string;
    collectionName: string;
    trackName: string;
    collectionCensoredName: string;
    trackCensoredName: string;
    artistViewUrl: string;
    collectionViewUrl: string;
    feedUrl: string;
    trackViewUrl: string;
    artworkUrl30: string;
    artworkUrl60: string;
    artworkUrl100: string;
    collectionPrice: number;
    trackPrice: number;
    collectionHdPrice: number;
    releaseDate: string;
    collectionExplicitness: string;
    trackExplicitness: string;
    trackCount: number;
    trackTimeMillis: number;
    country: string;
    currency: string;
    primaryGenreName: string;
    artworkUrl600: string;
    genreIds: string[];
    genres: string[];
  }
  
  export interface PodcastEpisode {
    wrapperType: "podcastEpisode";
    kind: "podcast-episode";
    artistIds: number[];
    collectionId: number;
    trackId: number;
    artistViewUrl: string;
    collectionViewUrl: string;
    trackViewUrl: string;
    artworkUrl600: string;
    feedUrl: string;
    closedCaptioning: string;
    episodeGuid: string;
    description: string;
    shortDescription: string;
    trackName: string;
    releaseDate: string;
    artworkUrl160: string;
    episodeFileExtension: string;
    episodeContentType: string;
    episodeUrl: string;
    trackTimeMillis?: number;
    previewUrl: string;
    country: string;
    genres: Genre[];
  }
  
  interface Genre {
    name: string;
    id: string;
  }
  