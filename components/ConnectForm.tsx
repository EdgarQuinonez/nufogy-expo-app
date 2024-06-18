import { useFormContext } from "react-hook-form";

export type Props = {
  children: (methods: ReturnType<typeof useFormContext>) => JSX.Element;
};

export const ConnectForm = ({ children }: Props) => {
  const methods = useFormContext();

  return children({ ...methods });
};
