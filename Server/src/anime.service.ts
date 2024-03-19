import { Injectable } from '@nestjs/common';
import type { MainAnimePageDataType } from './interfaces/MainAnimePageDataType';
import type { AnimePageDataType } from './interfaces/AnimePageDataType';
import getIndexAnimeQuery from './queries/getIndexAnimeQuery';
import getAnimePageQuery from './queries/getAnimePageQuery';
import getAnimeBannerQuery from './queries/AnimeBannerQuery';
import getAnimeSearchQuery from './queries/getAnimeSearchQuery';
import { AnimeSearchDataType } from './interfaces/AnimeSearchDataType';

@Injectable()
export class AnimeService {
  async getAnimeSearchData(search: string): Promise<AnimeSearchDataType> {
    const url = 'https://shikimori.one/api/graphql';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify({
        query: getAnimeSearchQuery(search)
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

  async getMainAnimePageData(
    limit: string,
    page: string
  ): Promise<MainAnimePageDataType> {
    const url = 'https://shikimori.one/api/graphql';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify({
        query: getIndexAnimeQuery(limit, page)
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
  }
}
