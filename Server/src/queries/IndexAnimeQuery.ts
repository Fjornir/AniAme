export default `
{
  animes(limit: 50) {
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
