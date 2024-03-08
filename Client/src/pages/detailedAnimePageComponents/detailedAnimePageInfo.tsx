import React from "react";
import { AnimePageDataType } from "../../types/Index";

function DetailedAnimePageInfo(props: {
  anime: AnimePageDataType | undefined;
}) {
  const { anime } = props;

  function animeGenres(
    props:
      | { id: number; name: string; russian: string; kind: string }[]
      | undefined
  ) {
    const res: any[] = [];

    props?.forEach((item) => {
      props[props.length - 1] === item
        ? res.push(`${item.name}`)
        : res.push(`${item.name}, `);
    });
    return res;
  }
  function animeStatus(props: string | undefined) {
    switch (props) {
      case "anons":
        return "Анонс";
        break;
      case "ongoing":
        return `Выходит с ${anime?.airedOn.date} по ${anime?.releasedOn.date}`;
        break;
      case "released":
        return `Вышло ${anime?.releasedOn.date}`;
        break;
      default:
        break;
    }
  }

  function animeSeasons(props: string | undefined) {
    switch (props?.split("_")[0]) {
      case "fall":
        return `Осень ${props.split("_")[1]}`;
        break;
      case "winter":
        return `Зима ${props.split("_")[1]}`;
        break;
      case "summer":
        return `Лето ${props.split("_")[1]}`;
        break;
      case "spring":
        return `Весна ${props.split("_")[1]}`;
        break;
      default:
        break;
    }
  }

  function kindAnimes(props: string | undefined) {
    if (props === "tv") {
      return "ТВ Сериал";
    }
    if (props === "movie") {
      return "Фильм";
    }
    if (props === "ova") {
      return "OVA";
    }
    if (props === "ona") {
      return "ONA";
    }
    if (props === "special") {
      return "Спешл";
    }
    if (props === "tv_special") {
      return "ТВ-Спешл";
    }
    if (props === "music") {
      return "Музыка";
    }
    if (props === "pv") {
      return "PV";
    }
    if (props === "cm") {
      return "CM";
    }
  }

  return (
    <div className="detailed-anime-info">
      <div className="detailed-anime-info-item">
        <div className="detailed-anime-info-item__label">Тип релиза:</div>
        <div className="detailed-anime-info-item__data">
          {kindAnimes(anime?.kind)}
        </div>
      </div>
      <div className="detailed-anime-info-item">
        <div className="detailed-anime-info-item__label">Рейтинг MPAA:</div>
        <div className="detailed-anime-info-item__data">{anime?.rating}</div>
      </div>
      <div className="detailed-anime-info-item">
        <div className="detailed-anime-info-item__label">
          Рейтинг Shikimori:
        </div>
        <div className="detailed-anime-info-item__data">{anime?.score}</div>
      </div>
      <div className="detailed-anime-info-item">
        <div className="detailed-anime-info-item__label">Статус:</div>
        <div className="detailed-anime-info-item__data">
          {animeStatus(anime?.status)}
        </div>
      </div>
      <div className="detailed-anime-info-item">
        <div className="detailed-anime-info-item__label">Эпизодов вышло:</div>
        <div className="detailed-anime-info-item__data">
          {anime?.episodesAired} / {anime?.episodes}
        </div>
      </div>
      <div className="detailed-anime-info-item">
        <div className="detailed-anime-info-item__label">Релиз в сезоне:</div>
        <div className="detailed-anime-info-item__data">
          {animeSeasons(anime?.season)}
        </div>
      </div>
      <div className="detailed-anime-info-item">
        <div className="detailed-anime-info-item__label">Релиз в сезоне:</div>
        <div className="detailed-anime-info-item__data detailed-anime-info-item__genres">
          {animeGenres(anime?.genres)}
        </div>
      </div>
      <div className="detailed-anime-info-item">
        <div className="detailed-anime-info-item__label">Студия:</div>
        <div className="detailed-anime-info-item__data detailed-anime-info-item__studios">
          {anime?.studios.map((item) => {
            return (
                <img src={item.imageUrl} alt="альтернативный текст" />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailedAnimePageInfo;
