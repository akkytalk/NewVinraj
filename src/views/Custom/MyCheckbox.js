import React from "react";

function MyCheckbox({ field, form, label, ...rest }) {
  const { name, value: formikValue } = field;
  const { setFieldValue } = form;

  console.log(
    `field`,
    field,
    "form",
    form,
    "formikValue",
    formikValue,
    "rest",
    rest
  );
  const handleChange = (event) => {
    const values = formikValue || [];
    const index = values.indexOf(rest.value);
    if (index === -1) {
      values.push(rest.value);
    } else {
      values.splice(index, 1);
    }
    setFieldValue(name, values);
  };
  return (
    <label>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={formikValue.indexOf(rest.value) !== -1}
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
}

export default MyCheckbox;
