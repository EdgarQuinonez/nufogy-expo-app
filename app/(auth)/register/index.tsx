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
import SignUpWithGoogleButton from "@components/SignUpWithGoogleButton";
import { setItem } from "@utils/AsyncStorage";
import PasswordStrengthInputGroup from "@components/PasswordStrengthInputGroup";

const nufogyLogoUri = Image.resolveAssetSource(nufogyLogo).uri;

const RegisterScreen = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );

  const onPasswordChange = (password: string, confirmed: boolean) => {
    setPassword(password);
    if (confirmed) {
      console.log("Password is valid:", password);
    } else {
      console.log("Password is invalid");
    }
  };

  const handleLogin = async () => {
    const apiEndpoint = `http://127.0.0.1:8000/api-token-auth`;
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

        setStatus("submitted");
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setStatus("off");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form onSubmit={handleLogin} width={"100%"}>
        <YStack alignItems="center" justifyContent="center">
          <Heading paddingVertical="$2">Crear una cuenta</Heading>
          <Image
            source={{
              uri: nufogyLogoUri,
              width: 104,
              height: 104,
            }}
          />
        </YStack>
        <YStack>
          <Label>Usuario</Label>
          <Input
            value={user}
            size={"$4"}
            onChangeText={setUser}
            placeholder="ej. pedrings58"
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
        <PasswordStrengthInputGroup
          size={"$4"}
          onPasswordChange={onPasswordChange}
        />
        <Form.Trigger asChild disabled={status !== "off"} marginTop="$2">
          <Button
            backgroundColor={"$primary"}
            icon={status === "submitting" ? () => <Spinner /> : undefined}
            iconAfter={status === "off" ? () => <ChevronRight /> : undefined}
          >
            Registrarse
          </Button>
        </Form.Trigger>
        <YStack>
          <SignUpWithGoogleButton />
          <XStack
            alignItems="center"
            justifyContent="center"
            width={"100%"}
            gap="$2"
          >
            <Label>¿Ya tienes una cuenta?</Label>
            <Link href={"/login"} asChild>
              <Button unstyled={true} chromeless fontWeight={"bold"}>
                Inicia sesión
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

export default RegisterScreen;
