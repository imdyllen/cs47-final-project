import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from "react-native-svg";

const TimerBackground: React.FC<SvgProps> = (props) => {
  return (
    <Svg width={177} height={177} fill="none" {...props}>
      <Circle cx={88.5} cy={88.5} r={83.5} fill="url(#a)" />
      <Path
        d="M172 88.5C172 42.384 134.616 5 88.5 5S5 42.384 5 88.5 42.384 172 88.5 172 172 134.616 172 88.5Z"
        stroke="url(#b)"
        strokeWidth={10}
        strokeLinecap="round"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={172}
          y1={172}
          x2={5}
          y2={5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#CCF4F7" />
          <Stop offset={1} stopColor="#fff" />
        </LinearGradient>
        <LinearGradient
          id="b"
          x1={207.158}
          y1={172}
          x2={-1.792}
          y2={-8.983}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#C5FAF7" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default TimerBackground;
