import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from "react-native-svg";

const BlueRadiusBackground: React.FC<SvgProps> = ({ height, ...restProps }) => (
  <Svg width={428} height={height} fill="none" {...restProps}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d={`M0 0h428v${height}h-.691c-4.905-37.196-35.365-66.336-73.166-69.207H80c-44.183 0-80-35.817-80-80V0Z`}
      fill="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        y1={0}
        x2={368.356}
        y2={431.133}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#CDF1FF" />
        <Stop offset={1} stopColor="#63DCDC" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default BlueRadiusBackground;
