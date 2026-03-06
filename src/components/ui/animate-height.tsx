import type { FC, ReactNode } from "react";
import { useMeasure } from "react-use";
import { motion, type Variants, type Easing } from "motion/react";

interface AnimateHeightProps {
  isVisible: boolean;
  ease?: Easing;
  duration?: number;
  className?: string;
  variants?: {
    open: object;
    closed: object;
  };
  children: ReactNode;
}
export const AnimateHeight: FC<AnimateHeightProps> = (
  {
    ease = "easeInOut",
    variants = {
      open: {
        opacity: 1,
        height: "auto",
      },
      closed: { opacity: 0, height: 0 },
    },
    isVisible,
    duration,
    children,
    ...other
  },

  //   {
  //   duration,
  //   ease,
  //   variants,
  //   isVisible,
  //   children,
  //   ...other
  // }
) => {
  const [ref, { height }] = useMeasure<HTMLDivElement>();
  return (
    <motion.div
      className="overflow-hidden"
      initial={isVisible ? "open" : "closed"}
      animate={isVisible ? "open" : "closed"}
      inherit={false}
      variants={variants as Variants}
      transition={{
        ease,
        duration:
          typeof duration == "number"
            ? duration
            : getAutoHeightDuration(height) / 1000,
      }}
      {...other}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};
/**
 * Get the duration of the animation depending upon
 * the height provided.
 * @param {number} height of container
 */
const getAutoHeightDuration = (height: number) => {
  if (!height) return 0;
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
};
// AnimateHeight.defaultProps = {
//   ease: 'easeInOut',
//   variants: {
//     open: {
//       opacity: 1,
//       height: 'auto',
//     },
//     closed: { opacity: 0, height: 0 },
//   },
// }
