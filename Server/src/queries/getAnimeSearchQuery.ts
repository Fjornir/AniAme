export default (search: string) =>
  `{
  animes(search: "${search}", limit:10, kind: "!special") {
    id
    russian
  }
}
    `;
