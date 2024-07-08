import { ChevronDown } from "@tamagui/lucide-icons";
import { FoodItemServing } from "@types";
import React, { useState } from "react";
import {
  Adapt,
  Paragraph,
  Select,
  SelectItemParentProvider,
  Sheet,
  XStack,
} from "tamagui";

export type Props = {
  serving: FoodItemServing | FoodItemServing[];
  onServingChange: (serving: FoodItemServing) => void;
};

export default function SelectDropdown({ serving, onServingChange }: Props) {
  const units = Array.isArray(serving) ? serving : [serving];

  const [selectedServingId, setSelectedServingId] = useState(
    units[0].serving_id.toString()
  );

  const handleValueChange = (newServingId: string) => {
    setSelectedServingId(newServingId);

    const selectedServing = units.find(
      (unit) => unit.serving_id.toString() === newServingId
    );
    if (!selectedServing) {
      throw new Error("Selected serving not found");
    } else {
      onServingChange(selectedServing);
    }
  };

  return (
    <Select
      value={selectedServingId}
      onValueChange={handleValueChange}
      name="selectedUnit"
      native
    >
      <Select.Trigger
        unstyled={true}
        backgroundColor={"$background0"}
        w={"100%"}
        pos={"relative"}
        ai={"center"}
        jc={"center"}
      >
        <Select.Value flex={1} />
        <ChevronDown size={14} pos={"absolute"} r={0} />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        {/* Conditional rendering for touch devices */}
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>
      <Select.Content zIndex={200000}>
        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>Raciones</Select.Label>
            {units.map((unit, i) => (
              <Select.Item
                index={i}
                key={unit.serving_id}
                value={unit.serving_id.toString()}
              >
                <XStack gap="$1">
                  <Paragraph>{unit.number_of_units}</Paragraph>
                  <Select.ItemText overflow="hidden" textOverflow="ellipsis">
                    {unit.measurement_description}
                  </Select.ItemText>
                </XStack>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
}
