export type Src = {
  src: string;
};

export type Song = {
  name: string;
  preview_url: string;

  external_urls: {
    spotify: string;
  };

  album: {
    images: {
      url: string;
    }[];
  };

  artists: {
    name: string;
  }[];
};
