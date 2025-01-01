import { forwardRef, useImperativeHandle, useState } from 'react';

interface Props {
  id: string;
  label: string;
}

export interface FormNumberChangeHandler {
  getNumberInput: () => number | undefined;
}

// eslint-disable-next-line react/display-name
const FormNumberChange = forwardRef<FormNumberChangeHandler, Props>(
  (props, ref) => {
    const { id, label } = props;

    const [numberInput, setNumberInput] = useState<number>();

    useImperativeHandle(ref, () => ({
      getNumberInput: () => numberInput,
    }));

    return (
      <>
        <label htmlFor="numberInput">{label}</label>
        <br />
        <input
          id={`${id}-numberChange`}
          type="number"
          onChange={(e) => setNumberInput(Number(e.target.value))}
        />
      </>
    );
  },
);

export default FormNumberChange;
