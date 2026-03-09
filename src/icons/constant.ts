export const SVG_ICONS = {
  //ARROW
  chevronUp: {
    d: "m18 15-6-6-6 6",
    class: "lucide lucide-chevron-up-icon lucide-chevron-up",
  },
  chevronLeft: {
    d: "m15 18-6-6 6-6",
    class: "lucide-chevron-left",
  },
  chevronDown: {
    d: "m6 9 6 6 6-6",
    class: "lucide lucide-chevron-down-icon lucide-chevron-down",
  },
  chevronRight: {
    d: "m9 18 6-6-6-6",
    class: "lucide-chevron-right",
  },

  circleUserRound: {
    d: "m18 15-6-6-6 6",
    class: "lucide-user",
  },
} as const;

export type TIconName = keyof typeof SVG_ICONS;
