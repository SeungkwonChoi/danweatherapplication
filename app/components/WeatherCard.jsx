import conditionsData from './weather/conditions.json'; // Import conditions.json

export default function WeatherCard({ day, weather, temperature, conditionCode }) {
  const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18 ? 'day' : 'night';
  };


  const getIconPath = (code, timeOfDay) => {
    const condition = conditionsData.find(item => item.code === code);
    if (condition && condition.icon) {
      const iconPath = `/images/weather/${timeOfDay}/${condition.icon}.png`;
      console.log('Icon Path:', iconPath);
      return iconPath;
    }
  
    // Log a message if no matching condition or icon is found
    console.log('Default Icon Path');
    return `./default/icon.svg`;
  };

  const timeOfDay = getTimeOfDay();

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg ml-2 my-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6">
      <div className="text-xl font-semibold text-center">{day}</div>
      <img src={getIconPath(conditionCode, timeOfDay)} alt={weather} className="w-16 h-16 mx-auto my-3" />
      <div className="text-lg text-center mb-5">{temperature}°</div>
      <div className="text-center">{weather}</div>
    </div>
  );
}
