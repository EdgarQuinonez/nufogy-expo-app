import { YStack } from "tamagui";
import TopBar from "components/TopBar";

export default function HomeScreen() {
  return (
    <YStack f={1} ai="center" gap="$8" px="$10" pt="$5">
      <TopBar />
    </YStack>
  );
}
