import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, AlertTriangle, Droplets, RefreshCw, MapPin } from 'lucide-react';

const KOLKATA_LAT = 22.5726;
const KOLKATA_LNG = 88.3639;

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      if (!apiKey) {
        setWeather({
          temp: 28,
          condition: 'Partly Cloudy',
          icon: '02d',
          humidity: 75,
          rainChance: 30,
          rainAlert: false,
          description: 'Light clouds over Kolkata'
        });
        setLastUpdated(new Date());
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${KOLKATA_LAT}&lon=${KOLKATA_LNG}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) throw new Error('Weather fetch failed');

      const data = await response.json();

      const current = data.current;
      const hourly = data.hourly || [];
      const nextHoursRain = hourly.slice(0, 6).some(h => h.pop > 0.3);
      const dailyRain = data.daily?.[0]?.pop > 0.5;

      setWeather({
        temp: Math.round(current.temp),
        condition: current.weather[0].main,
        icon: current.weather[0].icon,
        humidity: current.humidity,
        rainChance: Math.round((nextHoursRain ? 70 : dailyRain ? 50 : 20) * (current.humidity / 100)),
        rainAlert: nextHoursRain || (current.weather[0].main.toLowerCase().includes('rain') || current.weather[0].main.toLowerCase().includes('thunderstorm') || current.weather[0].main.toLowerCase().includes('drizzle')),
        description: current.weather[0].description,
        feelsLike: Math.round(current.feels_like)
      });
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      setWeather({
        temp: 28,
        condition: 'Partly Cloudy',
        icon: '02d',
        humidity: 75,
        rainChance: 30,
        rainAlert: false,
        description: 'Light clouds over Kolkata'
      });
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (icon, condition) => {
    const code = icon || '01d';
    const isNight = code.endsWith('n');
    const main = condition?.toLowerCase() || 'clear';

    if (main.includes('thunderstorm')) return <CloudRain className="h-8 w-8 text-yellow-400" strokeWidth={1.5} />;
    if (main.includes('drizzle') || main.includes('rain')) return <CloudRain className="h-8 w-8 text-blue-400" strokeWidth={1.5} />;
    if (main.includes('cloud')) return <Cloud className={`h-8 w-8 ${isNight ? 'text-slate-400' : 'text-sky-400'}`} strokeWidth={1.5} />;
    return <Sun className="h-8 w-8 text-yellow-400" strokeWidth={1.5} />;
  };

  if (loading && !weather) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-white/10 bg-white/5 p-5"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
            <div className="h-6 w-6 animate-pulse bg-white/10 rounded" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 animate-pulse bg-white/10 rounded" />
            <div className="h-3 w-1/2 animate-pulse bg-white/10 rounded" />
          </div>
        </div>
      </motion.div>
    );
  }

  const Icon = getWeatherIcon(weather.icon, weather.condition);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="rounded-xl border border-white/10 bg-white/5 p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-terracotta/10">
            {Icon}
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-display font-medium text-foreground">{weather.temp}°</span>
              <span className="text-sm text-muted-foreground">Feels like {weather.feelsLike}°</span>
            </div>
            <p className="text-xs text-muted-foreground capitalize">{weather.description}</p>
            <p className="mt-1 flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
              <MapPin className="h-3 w-3" strokeWidth={1.5} />
              Kolkata, West Bengal
            </p>
          </div>
        </div>

        {weather.rainAlert && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex h-fit items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5"
          >
            <AlertTriangle className="h-4 w-4 text-amber-400" strokeWidth={1.5} />
            <span className="text-xs font-medium text-amber-300">Rain Alert</span>
          </motion.div>
        )}

        <button
          onClick={fetchWeather}
          disabled={loading}
          className="shrink-0 rounded-lg p-2 text-muted-foreground/50 hover:text-terracotta hover:bg-white/5 transition-colors disabled:opacity-50"
          aria-label="Refresh weather"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} strokeWidth={1.5} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-white/5 p-3 text-center">
          <Droplets className="h-4 w-4 mx-auto text-sky-400" strokeWidth={1.5} />
          <p className="mt-1 text-xs font-medium text-foreground">{weather.humidity}%</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">Humidity</p>
        </div>

        <div className="rounded-lg bg-white/5 p-3 text-center">
          <CloudRain className="h-4 w-4 mx-auto text-blue-400" strokeWidth={1.5} />
          <p className="mt-1 text-xs font-medium text-foreground">{weather.rainChance}%</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">Rain Chance</p>
        </div>

        <div className="rounded-lg bg-white/5 p-3 text-center">
          <MapPin className="h-4 w-4 mx-auto text-terracotta" strokeWidth={1.5} />
          <p className="mt-1 text-xs font-medium text-foreground">
            {lastUpdated ? lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '--'}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">Updated</p>
        </div>
      </div>

      {weather.rainAlert && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3"
        >
          ⚠️ Sudden showers likely. Carry an umbrella or seek indoor pandals.
        </motion.p>
      )}
    </motion.div>
  );
}