import React from "react";
import { View, XStack } from "tamagui";
import * as Progress from "react-native-progress";

// ... (Props definition remains the same)
export type Props = {
  currentProgress: number;
  projectedProgress: number;
};

const ProjectedProgressBar = ({
  currentProgress,
  projectedProgress,
}: Props) => {
  return (
    <View pos={"relative"} h={10} flex={1}>
      <Progress.Bar
        progress={currentProgress}
        color="#1E1940"
        borderWidth={0}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
        }}
        width={null}
        height={10}
      />

      <Progress.Bar
        progress={projectedProgress}
        borderWidth={0}
        color="#90EE90"
        unfilledColor="#E0E0E0"
        height={10}
        width={null}
      />
    </View>
  );
};

export default ProjectedProgressBar;
