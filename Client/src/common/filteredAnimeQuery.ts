export default (query: { season: string }, limit: string, page: string) => `
{
  animes(season: ${query.season}, limit: ${limit}, page: ${page}) {
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
