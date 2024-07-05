import { ChevronDown } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { Adapt, Select, SelectItemParentProvider, Sheet } from "tamagui";

export default function SelectDropdown() {
  const weightUnits = [
    { name: "gram", value: "g" },
    { name: "kilogram", value: "kg" },
    { name: "milligram", value: "mg" },
    { name: "ounce", value: "oz" },
    { name: "pound", value: "lb" },
  ];
  const [selectedValue, setSelectedValue] = useState(weightUnits[0].value);

  return (
    <Select value={selectedValue} onValueChange={setSelectedValue} native>
      <Select.Trigger
        unstyled={true}
        backgroundColor={"$background0"}
        width={"100%"}
        iconAfter={<ChevronDown />}
      >
        <Select.Value />
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
            <Select.Label>Unidades</Select.Label>
            {weightUnits.map((unit, i) => (
              <Select.Item index={i} key={unit.value} value={unit.value}>
                <Select.ItemText>{unit.value}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
}
