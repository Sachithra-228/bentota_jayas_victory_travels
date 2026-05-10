declare module "@/components/DotField" {
  import * as React from "react";

  type DotFieldProps = {
    dotRadius?: number;
    dotSpacing?: number;
    cursorRadius?: number;
    cursorForce?: number;
    bulgeOnly?: boolean;
    bulgeStrength?: number;
    glowRadius?: number;
    sparkle?: boolean;
    waveAmplitude?: number;
    gradientFrom?: string;
    gradientTo?: string;
    glowColor?: string;
    className?: string;
    style?: React.CSSProperties;
  };

  const DotField: React.ComponentType<DotFieldProps>;
  export default DotField;
}
