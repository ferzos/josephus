import { atom, useSetAtom } from 'jotai';

// Global atom to track the current killer index
export const killersAtom = atom<number[]>([]);

interface Params {
  numberOfPeople: number;
}

export const useKillRotation = (params: Params) => {
  const { numberOfPeople } = params;
  const setKillers = useSetAtom(killersAtom);

  const createKillRotation = (initialKillerNumber: number) => {
    const josephusLinkedList = Array(numberOfPeople)
      .fill('-')
      .map((_, index) => ({
        next: (index + 1) % numberOfPeople,
      }));

    const theDeads: number[] = [];
    const theKillers: number[] = [];

    let killer = initialKillerNumber;
    let killed: number;
    while (theDeads.length < numberOfPeople - 1) {
      theKillers.push(killer);
      // Kill next to initial killer
      killed = josephusLinkedList[killer].next;

      // Set the next person to be killed in the next round by the one who just killed
      josephusLinkedList[killer].next = josephusLinkedList[killed].next;
      // Set the next killer for
      killer = josephusLinkedList[killed].next;

      theDeads.push(killed);
    }

    setKillers(theKillers);

    return { theDeads, finalKiller: killer };
  };

  return {
    createKillRotation,
  };
};
