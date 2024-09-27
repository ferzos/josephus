import { useEffect, useState } from 'react';

interface DeadSequenceItem {
  index: number;
  hasShownDead: boolean;
}

export const useDeadSequence = () => {
  const [deadSequence, setDeadSequence] = useState<DeadSequenceItem[]>([]);

  useEffect(() => {
    if (deadSequence.every((dead) => dead.hasShownDead)) return;

    const nextInDeadSequence = deadSequence.find((dead) => !dead.hasShownDead);

    setTimeout(
      () => setDeadSequence((currDeadSequence) => currDeadSequence.map((deadSequenceItem) => ({
        ...deadSequenceItem,
        hasShownDead:
              nextInDeadSequence?.index === deadSequenceItem.index
                ? true
                : deadSequenceItem.hasShownDead,
      }))),
      1000,
    );
  }, [deadSequence]);

  return {
    deadSequence,
    setDeadSequence,
  };
};
