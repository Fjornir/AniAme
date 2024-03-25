const GetAnimeSearchQuery = (search: string) =>
  `{
  animes(search: "${search}", limit:10, kind: "!special") {
    id
    russian
    kind
    status
    score
    poster { id originalUrl mainUrl }
    releasedOn { year month day date }
    genres { id name russian kind }
    studios { id name imageUrl }
  }
}
    `;

export default GetAnimeSearchQuery;
