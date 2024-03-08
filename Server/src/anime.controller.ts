import { Controller, Get, Param, Post } from '@nestjs/common';
import { AnimeService } from './anime.service';

@Controller()
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get(`anime/:id`)
  getAnimeId(@Param() params: { id: string }): object {
    return this.animeService.getAnimePageData(params.id);
  }

  @Get('anime')
  getAnime(): object {
    return this.animeService.getMainAnimePageData();
  }

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
}
