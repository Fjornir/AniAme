import { FiltersAnimePageDataType } from "../types/FiltersAnimePageDataType";

const getFiltredAnimeQuery = (
  limit?: string,
  page?: string,
  filters?: FiltersAnimePageDataType
) => {
  const params = [];

  if (!filters) return;

  const { date, genres, status, order } = filters;

  if (status?.length) {
    params.push(`status: "${status.join(",")}"`);
  }

  if (genres?.length) {
    params.push(`genre: "${genres.join(",")}"`);
  }

  if (order.length) {
    params.push(`order: ${order}`);
  }

  if (date?.isCheckedSeason) {
    if (date?.selectedSeasons.summer) {
      params.push(`season: "summer_${date?.endYear}"`);
    } else if (date?.selectedSeasons.fall) {
      params.push(`season: "fall_${date?.endYear}"`);
    } else if (date?.selectedSeasons.winter) {
      params.push(`season: "winter_${date?.endYear}"`);
    } else if (date?.selectedSeasons.spring) {
      params.push(`season: "spring_${date?.endYear}"`);
    } else {
      params.push(`season: "${date?.endYear}"`);
    }
  } else if (date?.endYear) {
    let selectedYearsStr;
    const { startYear, endYear } = date;

    if (startYear === endYear) {
      selectedYearsStr = `season: "${endYear}"`;
    } else {
      selectedYearsStr = `season: "${startYear}_${endYear}"`;
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
        score
        poster {
          mainUrl
        }
      }
    }
  `;
};

export default getFiltredAnimeQuery;
