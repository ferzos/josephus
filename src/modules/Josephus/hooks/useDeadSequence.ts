import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { killersAtom } from './useKillRotation';

interface DeadSequenceItem {
  index: number;
  hasShownDead: boolean;
}

interface KillSequenceItem {
  index: number;
  killerIndex: number;
  haShownKilling: boolean;
}

const DEAD_SEQUENCE_DELAY = 500;

export const useDeadSequence = () => {
  const [deadSequence, setDeadSequence] = useState<DeadSequenceItem[]>([]);

  const killers = useAtomValue(killersAtom);
  const [killSequence, setKillSequence] = useState<KillSequenceItem[]>([]);

  useEffect(() => {
    if (killers.length === 0) return;

    setKillSequence(
      killers.map((killerIndex, index) => ({
        index,
        killerIndex,
        haShownKilling: false,
      })),
    );
  }, [killers]);

  useEffect(() => {
    if (deadSequence.every((dead) => dead.hasShownDead)) return;

    const nextInDeadSequence = deadSequence.find((dead) => !dead.hasShownDead);
    const nextInKillSequence = killSequence.find(
      (killer) => !killer.haShownKilling,
    );

    setTimeout(() => {
      setKillSequence((currKillSequence) => currKillSequence.map((killSequenceItem) => ({
        ...killSequenceItem,
        haShownKilling:
            killSequenceItem.index === nextInKillSequence?.index
              ? true
              : killSequenceItem.haShownKilling,
      })));

      setDeadSequence((currDeadSequence) => currDeadSequence.map((deadSequenceItem) => ({
        ...deadSequenceItem,
        hasShownDead:
            nextInDeadSequence?.index === deadSequenceItem.index
              ? true
              : deadSequenceItem.hasShownDead,
      })));
    }, DEAD_SEQUENCE_DELAY);
  }, [deadSequence, killSequence, killers]);

  return {
    deadSequence,
    setDeadSequence,
    killSequence,
    setKillSequence,
  };
};
