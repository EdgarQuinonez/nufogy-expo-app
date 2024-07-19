import React, { useRef, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import {
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
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link, useRouter } from "expo-router";
import nufogyLogo from "@assets/images/nufogy_logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import PasswordInput from "@components/PasswordInput";
import SignUpWithGoogleButton from "@components/SignUpWithGoogleButton";
import { setItem } from "@utils/AsyncStorage";
import axios from "axios";
import { useToastController } from "@tamagui/toast";
import { globalStyles } from "globalStyles";
import { UserLogin, UserLoginInputs } from "types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAvoidingView } from "react-native";

const nufogyLogoUri = Image.resolveAssetSource(nufogyLogo).uri;

const LoginScreen = () => {
  const router = useRouter();
  const toast = useToastController();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserLoginInputs>();
  const usernameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );

  const handleLogin: SubmitHandler<UserLoginInputs> = async (data) => {
    const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/api-token-auth/`;
    setStatus("submitting");
    try {
      const response = await axios.post(apiEndpoint, {
        username: data.username.trim(),
        password: data.password.trim(),
      });

      if (response.status === 200) {
        const data = await response.data;
        const token = data.token;
        await setItem("authToken", token);

        setStatus("submitted");

        router.navigate("/(tabs)");
      } else {
        setStatus("off");
        toast.show("Error", {
          message: "Hubo un error al iniciar sesión.",
        });
      }
    } catch (error) {
      console.error("Error during login:", (error as any).response.data);
    } finally {
      setStatus("off");
    }
  };

  return (
    <SafeAreaView
      style={{ ...globalStyles.container, justifyContent: "center" }}
    >
      <KeyboardAvoidingView>
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
            <Controller
              control={control}
              name="username"
              rules={{
                required: "Ingresa un correo o usuario",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9_-]{3,16}$/i,
                  message: "Ingresa un correo válido",
                },
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  size={"$4"}
                  placeholder="ej. pedroelfire"
                  autoCapitalize="none"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  onSubmitEditing={() => {
                    if (passwordRef.current) {
                      passwordRef.current.focus();
                    }
                  }}
                  blurOnSubmit={false}
                  ref={ref}
                />
              )}
            />
            {errors.username && (
              <Paragraph color="red">{errors.username.message}</Paragraph>
            )}
          </YStack>
          <YStack gap="$2">
            <Label>Contraseña</Label>
            <Controller
              control={control}
              name="password"
              rules={{ required: "Ingresa una contraseña" }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <PasswordInput
                  size={"$4"}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  inputRef={ref}
                  handleSubmit={() => handleSubmit(handleLogin)}
                />
              )}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
