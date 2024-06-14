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
import { useToastController } from "@tamagui/toast";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { ArrowRight, ChevronRight, Eye, EyeOff } from "@tamagui/lucide-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import nufogyLogo from "@assets/images/nufogy_logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpWithGoogleButton from "@components/SignUpWithGoogleButton";
import { setItem } from "@utils/AsyncStorage";
import PasswordStrengthInputGroup from "@components/PasswordStrengthInputGroup";
import axios from "axios";
import { globalStyles } from "globalStyles";

const nufogyLogoUri = Image.resolveAssetSource(nufogyLogo).uri;

const RegisterScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const toast = useToastController();

  const onPasswordChange = (password: string, confirmed: boolean) => {
    setPassword(password);
    if (confirmed) {
      console.log("Password is valid:", password);
    } else {
      console.log("Password is invalid");
    }
  };

  const handleRegister = async () => {
    // const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/account/create`;
    const apiEndpoint = `https://nufogy-api.fly.dev/users/account/create/`;
    setStatus("submitting");

    try {
      const response = await axios.post(apiEndpoint, {
        username: user.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 201) {
        toast.show("¡Registro exitoso!", {
          message: "¡Bienvenido a Nufogy!",
        });
        router.navigate("login/index");
        // setItem("token", response.data.token);
      } else {
        toast.show("Error", {
          message: "Hubo un error al registrar tu cuenta.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setStatus("off");
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Form onSubmit={handleRegister} width={"100%"}>
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

export default RegisterScreen;
