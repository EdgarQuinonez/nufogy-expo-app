import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import {
  View,
  Input,
  Label,
  YStack,
  XStack,
  Button,
  Paragraph,
  Heading,
  Form,
  Spinner,
} from "tamagui";
import { Image } from "react-native";
import { ArrowRight, ChevronRight, Eye, EyeOff } from "@tamagui/lucide-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import nufogyLogo from "@assets/images/nufogy_logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import PasswordInput from "@components/PasswordInput";
import SignUpWithGoogleButton from "@components/SignUpWithGoogleButton";
import { setItem } from "@utils/AsyncStorage";
import axios from "axios";
import { useToastController } from "@tamagui/toast";
import { globalStyles } from "globalStyles";

const nufogyLogoUri = Image.resolveAssetSource(nufogyLogo).uri;

const LoginScreen = () => {
  const router = useRouter();
  const toast = useToastController();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );

  const handleLogin = async () => {
    // const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/api-token-auth/`;
    const apiEndpoint = `https://nufogy-api.fly.dev/api-token-auth/`;

    setStatus("submitting");

    try {
      const response = await axios.post(apiEndpoint, {
        username: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200) {
        const data = await response.data;
        const token = data.token;
        await setItem("authToken", token);

        setStatus("submitted");

        router.navigate("index");
      } else {
        setStatus("off");
        toast.show("Error", {
          message: "Hubo un error al iniciar sesión.",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setStatus("off");
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Form onSubmit={handleSubmit(handleLogin)} width={"100%"}>
        <YStack alignItems="center" justifyContent="center">
          <Heading paddingVertical="$2">Iniciar Sesión</Heading>
          <Image
            source={{
              uri: nufogyLogoUri,
              width: 104,
              height: 104,
            }}
          />
        </YStack>
        <YStack>
          <Label>Correo o usuario</Label>
          <Input
            value={email}
            size={"$4"}
            onChangeText={setEmail}
            placeholder="ej. pedroelfire@gmail.com o pedroelfire"
            {...register("email", {
              required: "Ingresa un correo o usuario",
              // pattern: {
              //   value:
              //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9_-]{3,16}$/i,
              //   message: "Ingresa un correo válido",
              // },
            })}
          />
          {errors.email && (
            <Paragraph color="red">{errors.email.message}</Paragraph>
          )}
        </YStack>
        <YStack gap="$2">
          <Label>Contraseña</Label>
          <PasswordInput
            value={password}
            handleTextChange={setPassword}
            size={"$4"}
          />
          {errors.password && (
            <Paragraph color="red">{errors.password.message}</Paragraph>
          )}
        </YStack>
        <Form.Trigger asChild disabled={status !== "off"} marginTop="$2">
          <Button
            backgroundColor={"$primary"}
            icon={status === "submitting" ? () => <Spinner /> : undefined}
            iconAfter={status === "off" ? () => <ChevronRight /> : undefined}
          >
            Iniciar Sesión
          </Button>
        </Form.Trigger>
        <YStack>
          <Button display="flex" alignSelf="center" chromeless>
            ¿Olvidaste tu contraseña?
          </Button>
          <SignUpWithGoogleButton />
          {/* <Paragraph>
            Al continuar, aceptas nuestros Términos de Servicio y Política de
            Privacidad
          </Paragraph> */}
          <XStack
            alignItems="center"
            justifyContent="center"
            width={"100%"}
            gap="$2"
          >
            <Label>¿No tienes una cuenta?</Label>
            <Link href={"/register"} asChild>
              <Button unstyled={true} chromeless fontWeight={"bold"}>
                Regístrate
              </Button>
            </Link>
          </XStack>
        </YStack>
      </Form>
    </SafeAreaView>
  );
};

export default LoginScreen;
