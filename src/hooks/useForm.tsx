import { ChangeEvent, useState } from "react";

export type ChangeFormFun = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

export const useForm = <T extends Object>(initState: T): [T, ChangeFormFun] => {
  const [form, setForm] = useState<T>(initState);
  const [cleanState] = useState<T>(initState);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return [form, handleChange];
};
