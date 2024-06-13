import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

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
import { Link } from "expo-router";
import nufogyLogo from "@assets/images/nufogy_logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import PasswordInput from "@components/PasswordInput";
import SignUpWithGoogleButton from "@components/SignUpWithGoogleButton";
import { setItem } from "@utils/AsyncStorage";

const nufogyLogoUri = Image.resolveAssetSource(nufogyLogo).uri;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );

  const handleLogin = async () => {
    const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/api-token-auth/`;
    setStatus("submitting");

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        console.log("Login successful:", token);
        // await AsyncStorage.setItem("authToken", token);
        await setItem("authToken", token);

        // Navigate to the next screen (if applicable)
        // ...

        setStatus("submitted");
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.log("username", email);
      console.log("password", password);
      console.error("Error during login:", error);
    } finally {
      // Reset status even if there's an error
      setStatus("off");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form onSubmit={handleLogin} width={"100%"}>
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
          <Label>Correo</Label>
          <Input
            value={email}
            size={"$4"}
            onChangeText={setEmail}
            placeholder="ej. pedroelfire@gmail.com"
          />
        </YStack>
        <YStack gap="$2">
          <Label>Contraseña</Label>
          <PasswordInput
            value={password}
            handleTextChange={setPassword}
            size={"$4"}
          />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

export default LoginScreen;
