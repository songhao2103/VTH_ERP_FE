export const SVG_ICONS = {
  //ARROW
  chevronUp: {
    children: <path d="m18 15-6-6-6 6" />,
    class: "lucide lucide-chevron-up-icon lucide-chevron-up",
  },
  chevronLeft: {
    children: <path d="m15 18-6-6 6-6" />,
    class: "lucide lucide-chevron-left-icon lucide-chevron-left",
  },
  chevronDown: {
    children: <path d="m6 9 6 6 6-6" />,
    class: "lucide lucide-chevron-down-icon lucide-chevron-down",
  },
  chevronRight: {
    children: <path d="m9 18 6-6-6-6" />,
    class: "lucide lucide-chevron-right-icon lucide-chevron-right",
  },
  arrowLeftToLine: {
    children: (
      <>
        <path d="M3 19V5" />
        <path d="m13 6-6 6 6 6" />
        <path d="M7 12h14" />
      </>
    ),
    class: "lucide lucide-arrow-left-to-line-icon lucide-arrow-left-to-line",
  },

  //USER
  circleUserRound: {
    children: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="10" r="3" />
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
      </>
    ),
    class: "lucide lucide-circle-user-icon lucide-circle-user",
  },

  //SKY
  sunMedium: {
    class: "lucide lucide-sun-medium-icon lucide-sun-medium",
    children: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v1" />
        <path d="M12 20v1" />
        <path d="M3 12h1" />
        <path d="M20 12h1" />
        <path d="m18.364 5.636-.707.707" />
        <path d="m6.343 17.657-.707.707" />
        <path d="m5.636 5.636.707.707" />
        <path d="m17.657 17.657.707.707" />
      </>
    ),
  },
  moon: {
    children: (
      <>
        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
      </>
    ),

    class: "lucide lucide-moon-icon lucide-moon",
  },
} as const;

export type TIconName = keyof typeof SVG_ICONS;
