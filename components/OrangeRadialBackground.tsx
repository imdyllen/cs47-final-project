import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Stop,
  SvgProps,
} from "react-native-svg";

const OrangeRadialBackground: React.FC<SvgProps & { size: number }> = ({
  size,
  ...restProps
}) => (
  <Svg width={size} height={size} fill="none" {...restProps}>
    <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#a)" />
    <Defs>
      <RadialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 57 -57 0 33 33)"
      >
        <Stop stopColor="#FF9283" />
        <Stop offset={0.51} stopColor="#FF6954" />
      </RadialGradient>
    </Defs>
  </Svg>
);

export default OrangeRadialBackground;
