import { ChangeEvent, useState } from "react";

export type ChangeFormFun = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

export const useForm = <T extends Object>(
  initState: T
): [T, ChangeFormFun, () => void, React.Dispatch<React.SetStateAction<T>>] => {
  const [form, setForm] = useState<T>(initState);
  const [cleanState] = useState<T>(initState);

  const handleCleanForm = (): void => {
    console.log(cleanState);

    setForm(cleanState);
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return [form, handleChange, handleCleanForm, setForm];
};
