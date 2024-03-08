import { Injectable } from '@nestjs/common';
import type { MainAnimePageDataType } from './interfaces/MainAnimePageDataType';
import type { AnimePageDataType } from './interfaces/AnimePageDataType';
import IndexAnimeQuery from './queries/IndexAnimeQuery';
import getAnimePageQuery from './queries/AnimePageQuery';
import getAnimeBannerQuery from './queries/AnimeBannerQuery';

@Injectable()
export class AnimeService {
  async getMainAnimePageData(): Promise<MainAnimePageDataType> {
    const url = 'https://shikimori.one/api/graphql';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify({
        query: IndexAnimeQuery
      })
    };

    try {
      const res = await fetch(url, options);
      const animeList = await res.json();
      return animeList.data.animes;
    } catch (error) {
      console.error(error);
    }
  }

  async getAnimePageData(id: string): Promise<AnimePageDataType> {
    const url = 'https://shikimori.one/api/graphql';
    let data;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify({
        query: getAnimePageQuery(id)
      })
    };

    try {
      const res = await fetch(url, options);
      const animeList = await res.json();
      data = animeList.data.animes[0];
    } catch (error) {
      console.error(error);
    }

    const bannerUrl = 'https://graphql.anilist.co';
    const bannerOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify({
        query: getAnimeBannerQuery(data.malId)
      })
    };

    try {
      const bannerRes = await fetch(bannerUrl, bannerOptions);
      const banner = await bannerRes.json();
      data.bannerImage = banner.data.Media.bannerImage;
      data.coverImage = banner.data.Media.coverImage.large;
      return data;
    } catch (error) {
      console.error(error);
    }

    // try {
    //   const res = await fetch(url, options);
    //   const animeList = await res.json();
    //   return animeList.data.animes[0];
    // } catch (error) {
    //   console.error(error);
    // }
  }
}
