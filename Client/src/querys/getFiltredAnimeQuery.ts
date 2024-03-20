import { FiltersAnimePageDataType } from "../types/FiltersAnimePageDataType";

const getFiltredAnimeQuery = (
  limit?: string,
  page?: string,
  filters?: FiltersAnimePageDataType
) => {
  const params = [];

  // export interface FiltersAnimePageDataType {
  //   date?: FiltersDateType;
  // }

  // export interface FiltersDateType {
  //   isCheckedSeason: boolean;
  //   startYear: number;
  //   endYear: number | null;
  // }
  if (filters?.date?.isCheckedSeason) {
    if (filters?.date?.selectedSeasons.summer) {
      params.push(`season: "summer_${filters?.date?.startYear}"`);
    } else if (filters?.date?.selectedSeasons.fall) {
      params.push(`season: "fall_${filters?.date?.startYear}"`);
    } else if (filters?.date?.selectedSeasons.winter) {
      params.push(`season: "winter_${filters?.date?.startYear}"`);
    } else if (filters?.date?.selectedSeasons.spring) {
      params.push(`season: "spring_${filters?.date?.startYear}"`);
    } else {
      params.push(`season: "${filters?.date?.startYear}"`);
    }
  } else if (filters?.date?.endYear) {
    let selectedYearsStr;
    const { startYear, endYear } = filters?.date;

    if (startYear === endYear) {
      selectedYearsStr = `season: "${startYear}"`;
    } else {
      selectedYearsStr = `season: "${startYear}_${endYear}"`;
    }
    params.push(selectedYearsStr);
  }
  if (page) {
    // if (filters?.selectedYear) {
    //   params.push(`season: "${filters.selectedYear}"`);
    // }

    // if (filters?.selectedYears) {
    //   let selectedYearsStr;
    //   const [yearFrom, yearTo] = filters?.selectedYears;

    //   if (yearFrom && yearFrom === yearTo) {
    //     selectedYearsStr = `season: "${yearFrom}"`;
    //   } else {
    //     selectedYearsStr = `season: "${yearFrom}_${yearTo}"`;
    //   }
    //   params.push(selectedYearsStr);
    // }

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
