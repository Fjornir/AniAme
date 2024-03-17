import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AnimeService } from './anime.service';

@Controller()
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get('anime/search')
  getAnimeSearch(@Query() query: { search: string }): object {
    return this.animeService.getAnimeSearchData(query.search);
  }

  @Get(`anime/:id`)
  getAnimeId(@Param() params: { id: string }): object {
    return this.animeService.getAnimePageData(params.id);
  }

  @Get('anime')
  getAnime(@Query() query: { limit: string; page: string }): object {
    return this.animeService.getMainAnimePageData(query.limit, query.page);
  }

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
}
