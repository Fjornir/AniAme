export default function kindAnimes(props: string | undefined) {
  switch (props) {
    case "tv":
      return "ТВ Сериал";
      break;

    case "movie":
      return "Фильм";
      break;

    case "ova":
      return "OVA";
      break;

    case "ona":
      return "ONA";
      break;

    case "special":
      return "Спешл";
      break;

    case "tv_special":
      return "ТВ-Спешл";
      break;

    case "music":
      return "Музыка";
      break;

    case "pv":
      return "PV";
      break;

    case "cm":
      return "CM";
      break;

    default:
      break;
  }
}
