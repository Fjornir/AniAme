const getIndexAnimeQuery = (limit: string, page: string) => `
{
  animes(limit: ${limit}, page: ${page}) {
    id
    name
    russian
    licenseNameRu
    english
    japanese
    poster {
      mainUrl
    }
  }
}
`;

export default getIndexAnimeQuery;
