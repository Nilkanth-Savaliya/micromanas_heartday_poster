import { FormControl} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";
import Select from "react-select";



const SelectFormField = (props) => {
  return (
    <FormControl isRequired={props.required}>
        <Field name={props.fieldName} mb={0}>
          {/* @ts-ignore */}
          {({ field, form }) => {
            return (
              <Select
                // id={"select"}
                value={props.options &&  (props.options.find((op) => op.value === props.value) || '')}
                name={props.fieldName}
                onChange={(e) => {
                  form.setFieldValue(props.fieldName, e.value);
                  props.onChange(e.value)
                }}
                options={props.options}
                placeholder={props.placeholder}
                
              />
            );
          }}
        </Field>
      {/* </InputGroup> */}
    </FormControl>
  );
};

export default SelectFormField;
