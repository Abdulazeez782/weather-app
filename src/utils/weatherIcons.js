import { iconDrizzle, iconSunny, iconFog, iconPartlyCloudy, iconRain, iconSnow, iconStorm } from "../assets/images";

export const getWeatherIcon = (code) => {
    if (code === 0) return iconSunny;

    if ([1,2,3].includes(code)) return iconPartlyCloudy;
    if ([45,48].includes(code)) return iconFog;
    if ([51,53,55].includes(code)) return iconDrizzle;
    if ([61,63,65,66,67].includes(code)) return iconRain;   
    if ([71, 73, 75, 77].includes(code)) return iconSnow;
    if (code === 95) return iconStorm;

    return iconPartlyCloudy;
}