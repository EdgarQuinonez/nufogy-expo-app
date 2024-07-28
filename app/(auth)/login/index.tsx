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
import { getItem, setItem } from "@utils/AsyncStorage";
import axios from "axios";
import { useToastController } from "@tamagui/toast";
import { colors, globalStyles } from "globalStyles";
import { StoredValue, UserLogin, UserLoginInputs } from "types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAvoidingView } from "react-native";
import { useAuth } from "@utils/useAuth";

const nufogyLogoUri = Image.resolveAssetSource(nufogyLogo).uri;

const fetchUserProfile = async (authToken: StoredValue) => {
  try {
    const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/account/profile/get`;

    const response = await axios.get(apiEndpoint, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    if (response.status === 200) {
      const profileData = response.data;

      await setItem("userProfile", JSON.stringify(profileData));
    } else {
      // Handle error response
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

const LoginScreen = () => {
  const router = useRouter();
  const toast = useToastController();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserLoginInputs>();
  const { authToken, setAuthToken } = useAuth();
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
        setAuthToken(token);
        await fetchUserProfile(token);

        setStatus("submitted");

        router.replace("/(tabs)");
      }
    } catch (error) {
      setStatus("off");

      toast.show("Error", {
        message:
          "Hubo un error al iniciar sesión. Por favor, intenta de nuevo.",
      });
      // console.error("Error during login:", (error as any).response.data);
    } finally {
      setStatus("off");
    }
  };

  return (
    <SafeAreaView
      style={{
        ...globalStyles.container,
        justifyContent: "center",
        backgroundColor: colors.background.main,
      }}
    >
      <KeyboardAvoidingView>
        <Form onSubmit={handleSubmit(handleLogin)} width={"100%"}>
          <YStack alignItems="center" justifyContent="center">
            <Heading paddingVertical="$2" color={colors.text.main}>
              Iniciar Sesión
            </Heading>
            <Image
              source={{
                uri: nufogyLogoUri,
                width: 104,
                height: 104,
              }}
            />
          </YStack>
          <YStack>
            <Label color={colors.text.main}>Correo o usuario</Label>
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
                  unstyled={true}
                  borderWidth={1}
                  focusStyle={{ borderColor: colors.text.dim }}
                  size={"$4"}
                  bg={colors.background.accent}
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
            <Label color={colors.text.main}>Contraseña</Label>
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
              backgroundColor={colors.primary}
              color={colors.background.main}
              icon={
                status === "submitting"
                  ? () => <Spinner color={colors.background.main} />
                  : undefined
              }
              iconAfter={
                status === "off"
                  ? () => <ChevronRight color={colors.background.main} />
                  : undefined
              }
            >
              Iniciar Sesión
            </Button>
          </Form.Trigger>
          <YStack>
            <Button
              display="flex"
              alignSelf="center"
              color={colors.text.main}
              chromeless
            >
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
              <Label color={colors.text.main}>¿No tienes una cuenta?</Label>
              <Link href={"/register"} asChild>
                <Button
                  unstyled={true}
                  color={colors.text.main}
                  chromeless
                  fontWeight={"bold"}
                >
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
