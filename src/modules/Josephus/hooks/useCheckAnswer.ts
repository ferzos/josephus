import {
  ComponentProps, useEffect, useRef, useState,
} from 'react';
import SweetAlert2 from 'react-sweetalert2';
import { FormNumberChangeHandler } from '../Form/FormNumberChange';

interface Params {
  isAllDead: boolean;
}

export const useCheckAnswer = (params: Params) => {
  const { isAllDead } = params;
  const survivorIndexInputRef = useRef<FormNumberChangeHandler>(null);
  const [finalKillerAnswer, setFinalKillerAnswer] = useState<number>(0);
  const [sw2Props, setSw2Props] = useState<ComponentProps<typeof SweetAlert2>>();

  useEffect(() => {
    if (isAllDead) {
      const userAnswer = Number(survivorIndexInputRef.current?.getNumberInput()) - 1;
      const isAnswerCorrect = finalKillerAnswer === userAnswer;
      const text = `The remaining person is person number: ${finalKillerAnswer + 1}`;

      if (isAnswerCorrect) {
        setSw2Props({
          show: true,
          title: 'Correct!',
          // titleText,
          text,
          icon: 'success',
        });
      } else {
        setSw2Props({
          show: true,
          title: 'Wrong!',
          text,
          icon: 'error',
        });
      }
    }
  }, [finalKillerAnswer, isAllDead, setSw2Props]);

  return {
    setFinalKillerAnswer,
    survivorIndexInputRef,
    sw2Props,
    setSw2Props,
  };
};
