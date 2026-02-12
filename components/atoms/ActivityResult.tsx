const ActivityResult = ({
  icon,
  label,
  time,
  speed,
  unit,
}: {
  icon: JSX.Element;
  label: string;
  time: string;
  speed?: string;
  unit?: string;
}) => (
  <div className="col-span-6 md:col-span-2" aria-label={label}>
    <div className="text-center">
      <div className="inline-block align-middle w-8 h-8">{icon}</div>
      <p className="inline-block align-middle m-0 px-2 text-xl font-bold text-logo">{time}</p>
    </div>
    {speed && (
      <p className="text-sm m-1 text-center text-logo">
        {speed}
        <span className="text-xs pl-0.5">{unit}</span>
      </p>
    )}
  </div>
);

export default ActivityResult;
