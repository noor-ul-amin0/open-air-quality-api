import React from "react";
import { Form, Input } from "semantic-ui-react";

interface Props {
  placeholder: string;
  value: string;
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}

const InputField: React.FC<Props> = ({
  placeholder,
  value,
  label,
  name,
  onChange,
  error,
}) => {
  return (
    <Form.Field
      control={Input}
      error={!error ? false : { content: error, pointing: "below" }}
    >
      <Input
        placeholder={placeholder}
        label={label}
        value={value}
        name={name}
        onChange={onChange}
      />
    </Form.Field>
  );
};

export default InputField;
