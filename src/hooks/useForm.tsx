import { ChangeEvent, useState } from "react";

export const useForm = <T extends Object>(
  initState: T
): [T, ({ target }: ChangeEvent<HTMLInputElement>) => void] => {
  const [form, setForm] = useState(initState);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return [form, handleChange];
};
