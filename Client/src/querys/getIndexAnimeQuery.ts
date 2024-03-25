const getIndexAnimeQuery = (limit: string, page: string) => `
{
  animes(limit: ${limit}, page: ${page}) {
    id
    name
    russian
    licenseNameRu
    english
    japanese
    score
    poster {
      mainUrl
    }
  }
}
`;

export default getIndexAnimeQuery;
