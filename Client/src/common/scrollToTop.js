import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  navigator.geolocation.getCurrentPosition(success);

  useEffect(() => {
    if (pathname !== "/") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
