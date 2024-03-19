const getFiltredAnimeQuery = (
  limit?: string,
  page?: string,
  filters?: {
    selectedYears?: number[];
  }
) => {
  const params = [];
  if (filters?.selectedYears) {
    let selectedYearsStr;
    const [yearFrom, yearTo] = filters?.selectedYears;

    if (yearFrom && yearFrom === yearTo) {
      selectedYearsStr = `season: "${yearFrom}"`;
    } else {
      selectedYearsStr = `season: "${yearFrom}_${yearTo}"`;
    }
    params.push(selectedYearsStr);
  }
  if (page) {
    const pageStr = `page: ${page}`;
    params.push(pageStr);
  }

  if (limit) {
    const limitStr = `limit: ${limit}`;
    params.push(limitStr);
  }

  const paramsString = params.join(", ");

  console.log(paramsString);

  return `
    {
      animes(${paramsString}) {
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
};

export default getFiltredAnimeQuery;
