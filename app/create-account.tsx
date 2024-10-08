import React, { useState } from "react";
import {
  Input,
  Label,
  YStack,
  XStack,
  Button,
  Heading,
  Form,
  Spinner,
  Paragraph,
  ScrollView,
} from "tamagui";
import { useToastController } from "@tamagui/toast";
import { Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAvoidingView } from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import nufogyLogo from "@assets/images/nufogy_logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpWithGoogleButton from "@components/SignUpWithGoogleButton";
import PasswordStrengthInputGroup from "@components/PasswordStrengthInputGroup";
import axios from "axios";
import { colors, globalStyles } from "globalStyles";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "@providers/AuthContext";
import { UserRegistration } from "@types";

const nufogyLogoUri = Image.resolveAssetSource(nufogyLogo).uri;

const registrationSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Ingresa un usuario")
    .min(6, "El usuario debe tener al menos 6 caracteres")
    .matches(/^[a-zA-Z0-9_]*$/, {
      message: "El usuario solo puede contener letras, números y guiones bajos",
    }),
  email: yup
    .string()
    .trim()
    .required("Ingresa un correo")
    .email("Ingresa un correo válido"),
  password: yup.string().trim().required("Ingresa una contraseña"),
  confirmPassword: yup
    .string()
    .trim()
    .required("Confirma tu contraseña")
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir"),
});

const RegisterScreen = () => {
  const router = useRouter();
  const { signIn } = useSession();
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const toast = useToastController();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(registrationSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onPasswordChange = (password: string, confirmed: boolean) => {};

  const handleRegister: SubmitHandler<UserRegistration> = async (data) => {
    const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/account/create/`;
    setStatus("submitting");
    try {
      const response = await axios.post(apiEndpoint, {
        username: data.username.trim(),
        email: data.email.trim(),
        password: data.password.trim(),
      });

      if (response.status === 201) {
        toast.show("¡Registro exitoso!", {
          message: "¡Bienvenido a Nufogy!",
        });
        signIn(data);
        router.replace("/(app)");
      } else {
        toast.show("Error", {
          message: "Hubo un error al registrar tu cuenta.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", (error as any).response.data);
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
      {/* <ScrollView > */}
      <KeyboardAvoidingView>
        <Form onSubmit={handleSubmit(handleRegister)} width={"100%"} px={"$4"}>
          <YStack alignItems="center" justifyContent="center">
            <Heading paddingVertical="$2" color={colors.text.main}>
              Crear una cuenta
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
            <Label color={colors.text.main}>Usuario</Label>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  unstyled={true}
                  borderWidth={1}
                  focusStyle={{ borderColor: colors.text.dim }}
                  bg={colors.background.accent}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  autoComplete="off"
                  returnKeyType="next"
                  autoCorrect={false}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  size={"$4"}
                  placeholder="ej. pedroelfire"
                  color={colors.text.main}
                />
              )}
            />
            {errors.username && (
              <Paragraph color="red">{errors.username.message}</Paragraph>
            )}
          </YStack>
          <YStack>
            <Label color={colors.text.main}>Correo</Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  unstyled={true}
                  borderWidth={1}
                  bg={colors.background.accent}
                  focusStyle={{ borderColor: colors.text.dim }}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  returnKeyType="next"
                  autoCorrect={false}
                  inputMode="email"
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  size={"$4"}
                  placeholder="ej. pedroelfire@gmail.com"
                />
              )}
            />
            {errors.email && (
              <Paragraph color="red">{errors.email.message}</Paragraph>
            )}
          </YStack>

          <PasswordStrengthInputGroup
            size={"$4"}
            onPasswordChange={onPasswordChange}
            control={control}
            errors={errors}
          />
          <Form.Trigger asChild disabled={status !== "off"} marginTop="$2">
            <Button
              bg={colors.primary}
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
              <Label color={colors.text.main}>¿Ya tienes una cuenta?</Label>
              <Link href={"/sign-in"} asChild>
                <Button
                  unstyled={true}
                  chromeless
                  fontWeight={"bold"}
                  color={colors.text.main}
                >
                  Inicia sesión
                </Button>
              </Link>
            </XStack>
          </YStack>
        </Form>
      </KeyboardAvoidingView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default RegisterScreen;
