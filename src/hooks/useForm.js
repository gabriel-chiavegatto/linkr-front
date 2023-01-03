import React from "react";

function useForm(type) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  function validate(value) {
    if (value.length === 0) {
      if(type === 'email'){
      setError("Preencha com um email valido por favor!");
      return false;
      }
      if(type === 'password'){
        setError("Preencha com uma senha valida por favor!");
        return false;
      }
      
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if(error){
      validate(target.value)
    }
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
}

export default useForm;
