import { motion } from 'framer-motion';
import './style.css';
import { useEffect, useRef } from 'react';

const CONTAINER_SIZE = 500;
const CENTER = CONTAINER_SIZE / 2;
const SPACING = 50;
const PERSON_SIZE = 30; // width and head diameter
const BODY_HEIGHT = PERSON_SIZE * 1.2;
const BODY_WIDTH = PERSON_SIZE * 0.5;

interface Props {
  i: number;
  numberOfPeople: number;
  isAlive?: boolean;
  isKilling?: boolean;
}

export function People(props: Props) {
  const {
    i, numberOfPeople, isAlive = false, isKilling = false,
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      console.log({ rect, i }); // Contains properties like top, left, width, height, etc.
    }
  }, [i]);

  // Positioning helpers
  const angleForIndex = (index: number) => (index / numberOfPeople) * 2 * Math.PI;
  const getXY = (angle: number, xyRadius: number) => ({
    x: xyRadius * Math.cos(angle),
    y: xyRadius * Math.sin(angle),
  });
  const angle = angleForIndex(i);
  const calculatedRadius = Math.min(
    (numberOfPeople * (PERSON_SIZE + SPACING)) / (2 * Math.PI),
    CENTER - PERSON_SIZE, // limit max radius to fit container
  );
  const { x, y } = getXY(angle, calculatedRadius);
  const left = CENTER + x;
  const top = CENTER + y;

  return (
    <div className="tooltip">
      <motion.div
        ref={ref}
        key={i}
        className="person"
        style={{
          left: left - PERSON_SIZE / 2,
          top: top - (PERSON_SIZE + BODY_HEIGHT) / 2,
          width: PERSON_SIZE,
          height: PERSON_SIZE + BODY_HEIGHT,
        }}
        animate={{
          scale: isKilling ? 1.3 : 1,
          rotate: isKilling ? [0, 60, -60, 0] : 0,
        }}
        transition={{
          duration: isKilling ? 0.25 : 0,
          ease: 'easeInOut',
        }}
      >
        {/* Head */}
        <motion.div
          className="head"
          style={{
            width: PERSON_SIZE,
            height: PERSON_SIZE,
          }}
          animate={{
            backgroundColor: isAlive ? '#f1c27d' : '#d1d5db',
          }}
        >
          {i + 1}
        </motion.div>

        {/* Body */}
        <motion.div
          className="body"
          style={{
            width: BODY_WIDTH,
            height: BODY_HEIGHT,
            borderRadius: BODY_WIDTH / 2,
          }}
          animate={{
            backgroundColor: isAlive ? '#3b82f6' : '#d1d5db',
          }}
        >
          {/* Blood animation */}
          {!isAlive && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 5, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateX(-100%)',
                width: 10,
                height: 10,
                backgroundColor: 'red',
                borderRadius: '50%',
                zIndex: -1,
              }}
            />
          )}
        </motion.div>
      </motion.div>

      <span
        className="tooltipText"
        style={{
          left: left - BODY_WIDTH,
          top: top - (PERSON_SIZE + BODY_HEIGHT),
        }}
      >
        {i + 1}
      </span>
    </div>
  );
}

export default People;
