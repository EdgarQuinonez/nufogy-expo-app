import {
  View,
  Text,
  YStack,
  Paragraph,
  H4,
  Image,
  Button,
  XStack,
  ScrollView,
} from "tamagui";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "globalStyles";
import { Bike, Bone, Car, Dot, Heart } from "@tamagui/lucide-icons";
import BicepsFlexed from "@assets/icons/BicepsFlexed";
import { useFormData } from "@providers/FormProfileContext";
import { Controller } from "react-hook-form";

export interface ActivityLevelProps {
  physical_activity: string;
  onPress: () => void;
  isSelected?: boolean;
}

export default function ActivityLevelScreen() {
  const {
    methods: { control, watch },
  } = useFormData();
  const selectedActivity = watch("activityLevel");

  const activityLevels = ["sedentary", "lightly", "moderate", "very", "extra"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.main }}>
      <YStack f={1} ai="center" jc="center" gap="$2" px="$4">
        <H4 color={colors.text.main}>¿Cuál es tu nivel de actividad física?</H4>
        <Paragraph color={colors.text.dim1} textAlign="center">
          Elige el nivel con el que te sientas más identificado
        </Paragraph>
        <ScrollView contentContainerStyle={{ ai: "center", jc: "center" }}>
          <YStack gap="$2" mt="$4">
            {activityLevels.map((level, i) => (
              <Controller
                key={i}
                name="activityLevel"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ActivityLevel
                    physical_activity={level}
                    onPress={() => onChange(level)}
                    isSelected={value === level}
                  />
                )}
              />
            ))}
          </YStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
}

function ActivityLevel({
  physical_activity,
  onPress,
  isSelected,
}: ActivityLevelProps) {
  let title;
  let icon;
  let bgColor;

  switch (physical_activity) {
    case "sedentary":
      title = "Sedentario";
      icon = <Car color={colors.text.main} />;
      bgColor = colors.sedentary;
      break;
    case "lightly":
      title = "Poco Activo";
      icon = <Bone color={colors.text.main} />;
      bgColor = colors.lightly;
      break;
    case "moderate":
      title = "Moderadamente Activo";
      icon = <Heart color={colors.text.main} />;
      bgColor = colors.moderate;
      break;
    case "very":
      title = "Muy Activo";
      icon = <BicepsFlexed color={colors.text.main} />;
      bgColor = colors.very;
      break;
    case "extra":
      title = "Extra Activo";
      icon = <Bike color={colors.text.main} />;
      bgColor = colors.extra;
      break;
  }

  return (
    <YStack ai={"center"} jc={"center"} maxWidth={"100%"}>
      <Button
        onPress={onPress}
        bg={bgColor}
        borderColor={colors.text.main}
        borderWidth={isSelected ? 2 : 0}
      >
        <XStack w={"100%"} ai={"center"} jc={"space-between"}>
          <Paragraph fontWeight={"bold"} color={colors.text.main}>
            {title}
          </Paragraph>
          {icon}
        </XStack>
      </Button>
      {isSelected && <ActivityDetails level={physical_activity} />}
    </YStack>
  );
}

function ActivityDetails({ level }: { level: string }) {
  let bulletPoints: string[] = [];

  switch (level) {
    case "sedentary":
      bulletPoints = [
        "Principalmente descanso.",
        "Trabajo de escritorio o conducir.",
        "Puede incluir tareas domésticas moderadas (por ejemplo, lavar platos, limpieza ligera).",
        "Puede incluir periodos de pie.",
        "Sin ejercicio intencional.",
      ];
      break;

    case "lightly":
      bulletPoints = [
        "Actividades de la vida diaria (por ejemplo, bañarse, vestirse, comer).",
        "Periodos más largos de pie.",
        "Tareas domésticas más intensas (por ejemplo, aspirar, fregar pisos).",
        "Ejercicio ligero la mayoría de los días de la semana:",
        "  - Caminar lento.",
        "  - Ciclismo tranquilo.",
        "  - Jardinería.",
      ];
      break;

    case "moderate":
      bulletPoints = [
        "Mínimo tiempo sentado o descansando.",
        "Trabajo que implica estar de pie o algo de trabajo físico (por ejemplo, comercio minorista, trabajo manual ligero).",
        "Ejercicio moderado la mayoría de los días de la semana:",
        "  - Bailar.",
        "  - Caminar a paso ligero.",
        "  - Nadar.",
      ];
      break;

    case "very":
      bulletPoints = [
        "Trabajo físicamente intensivo (por ejemplo, construcción, trabajo manual).",
        "Actividades vigorosas la mayoría de los días de la semana:",
        "  - Trotar o correr.",
        "  - Usar equipo de gimnasio para entrenamiento de fuerza o cardiovascular.",
        "  - Participar en deportes físicos (por ejemplo, fútbol, baloncesto).",
      ];
      break;

    case "extra":
      bulletPoints = [
        'Todos los criterios de "Muy Activo" MÁS:',
        "  - Ejercicio diario adicional o mayor duración de actividad vigorosa.",
        "  - Entrenamiento intenso para deportes o competiciones.",
        "  - Múltiples sesiones de entrenamiento por día.",
        "  - Trabajo extremadamente exigente físicamente (por ejemplo, atleta profesional).",
      ];
      break;
  }

  return (
    <YStack
      bg={colors.background.accent}
      borderBottomLeftRadius={"$4"}
      borderBottomRightRadius={"$4"}
      gap="$2"
      px="$4"
      py="$2"
    >
      {bulletPoints.map((point, index) => {
        if (point.startsWith("  - ")) {
          return (
            <XStack key={index} gap="$1" ml={"$6"} w={"100%"}>
              <Dot color={colors.text.main} />
              <Paragraph color={colors.text.main} textWrap={"wrap"}>
                {point.slice(3)}
              </Paragraph>
            </XStack>
          );
        } else {
          return (
            <XStack key={index} gap="$1" ml={"$2"} w={"100%"}>
              <Dot color={colors.text.main} />
              <Paragraph color={colors.text.main} textOverflow={"clip"}>
                {point}
              </Paragraph>
            </XStack>
          );
        }
      })}
    </YStack>
  );
}
