import COLORS from '@/styles/colors';

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
      <div className="inline-block align-middle w-[30px] h-[30px]">{icon}</div>
      <p
        className="inline-block align-middle m-0 px-2 text-xl font-bold"
        style={{
          color: COLORS.LOGO,
          fontFamily: 'FontBold',
        }}
      >
        {time}
      </p>
    </div>
    {speed && (
      <p className="text-sm m-1 text-center">
        {speed}
        <span className="text-xs pl-0.5" style={{ color: COLORS.GRAY_DARK }}>
          {unit}
        </span>
      </p>
    )}
  </div>
);

export default ActivityResult;
