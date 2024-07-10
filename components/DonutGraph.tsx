import { View, Text, Paragraph, YStack } from "tamagui";
import React from "react";
import Svg, { G, Circle } from "react-native-svg";

export type Props = {
  data: {
    protein: number;
    carbohydrate: number;
    fat: number;
    calories: number;
  };
};

export default function DonutGraph({ data }: Props) {
  const radius = 60;
  const circleCircumference = 2 * Math.PI * radius;
  const strokeWidth = 20;

  const totalMacros = data.protein + data.carbohydrate + data.fat;

  const proteinPercentage = data.protein / totalMacros;
  const carbsPercentage = data.carbohydrate / totalMacros;
  const fatPercentage = data.fat / totalMacros;

  const sliceData = [
    {
      percentage: proteinPercentage,
      color: "#EF7D7D",
    },
    {
      percentage: carbsPercentage,
      color: "#41BF84",
    },
    {
      percentage: fatPercentage,
      color: "#77ABD9",
    },
  ].filter((slice) => slice.percentage > 0);

  const height = radius * 2 + strokeWidth;
  const width = radius * 2 + strokeWidth;
  const viewBox = `0 0 ${width + strokeWidth} ${height + strokeWidth}`;

  let cumulativeOffset = 0;

  return (
    <View f={1} jc={"center"} ai={"center"}>
      <View ai={"center"} jc={"center"}>
        <Svg height={height} width={width} viewBox={viewBox}>
          <G
            rotation={-90}
            originX={(width + strokeWidth) / 2}
            originY={(height + strokeWidth) / 2}
          >
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={"#E5E5E5"}
              fill={"transparent"}
              strokeWidth={strokeWidth}
            />
            {sliceData.map((slice, index) => {
              const sliceLength = circleCircumference * slice.percentage;
              const dashOffset = cumulativeOffset;

              cumulativeOffset += sliceLength;

              return (
                <Circle
                  key={index}
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={slice.color}
                  fill={"transparent"}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                />
              );
            })}
          </G>
        </Svg>
        <YStack pos={"absolute"} jc={"center"} ai={"center"}>
          <Paragraph fontWeight={"bold"} fontSize={"$6"}>
            {data.calories}
          </Paragraph>
          <Paragraph color={"$gray10"}>kcal</Paragraph>
        </YStack>
      </View>
    </View>
  );
}
