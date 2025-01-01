import { useEffect, useRef, useState } from 'react';
import { FormNumberChangeHandler } from '../Form/FormNumberChange';

interface Params {
  isAllDead: boolean;
}

export const useCheckAnswer = (params: Params) => {
  const { isAllDead } = params;
  const survivorIndexInputRef = useRef<FormNumberChangeHandler>(null);
  const [finalKillerAnswer, setFinalKillerAnswer] = useState<number>();

  useEffect(() => {
    if (isAllDead) {
      const userAnswer = Number(survivorIndexInputRef.current?.getNumberInput()) - 1;
      const isAnswerCorrect = finalKillerAnswer === userAnswer;
      if (isAnswerCorrect) {
        setTimeout(() => alert('correct'), 500);
      } else {
        setTimeout(() => alert('wrong'), 500);
      }
    }
  }, [finalKillerAnswer, isAllDead]);

  return {
    setFinalKillerAnswer,
    survivorIndexInputRef,
  };
};
