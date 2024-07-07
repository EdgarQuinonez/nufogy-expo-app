import { ChevronDown } from "@tamagui/lucide-icons";
import { FoodItemServing } from "@types";
import React, { useState } from "react";
import { Adapt, Select, SelectItemParentProvider, Sheet } from "tamagui";

export type Props = {
  serving: FoodItemServing | FoodItemServing[];
};

export default function SelectDropdown({ serving }: Props) {
  const units = Array.isArray(serving) ? serving : [serving];
  console.log(units.length);

  const [selectedValue, setSelectedValue] = useState(
    units[0].metric_serving_unit
  );

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
            {units.map((unit, i) => (
              <Select.Item
                index={i}
                key={unit.serving_id}
                value={unit.metric_serving_unit}
              >
                <Select.ItemText overflow="hidden" textOverflow="ellipsis">
                  {unit.metric_serving_amount} {unit.metric_serving_unit} -{" "}
                  {unit.measurement_description}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
}
