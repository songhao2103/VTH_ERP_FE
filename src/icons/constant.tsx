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

  //#region BUTTON ACTION
  check: {
    class: "lucide lucide-check-icon lucide-check",
    children: <path d="M20 6 9 17l-5-5" />,
  },

  checlCheck: {
    class: "lucide lucide-check-check-icon lucide-check-check",
    children: (
      <>
        <path d="M18 6 7 17l-5-5" />
        <path d="m22 10-7.5 7.5L13 16" />
      </>
    ),
  },
  circleX: {
    class: "lucide lucide-circle-x-icon lucide-circle-x",
    children: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </>
    ),
  },
  download: {
    class: "lucide lucide-download-icon lucide-download",
    children: (
      <>
        <path d="M12 15V3" />
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="m7 10 5 5 5-5" />
      </>
    ),
  },
  folderOpen: {
    class: "lucide lucide-folder-open-icon lucide-folder-open",
    children: (
      <>
        <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
      </>
    ),
  },
  pencil: {
    class: "lucide lucide-pencil-icon lucide-pencil",
    children: (
      <>
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
        <path d="m15 5 4 4" />
      </>
    ),
  },
  plus: {
    class: "lucide lucide-plus-icon lucide-plus",
    children: (
      <>
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </>
    ),
  },
  refreshCw: {
    class: "lucide lucide-refresh-cw-icon lucide-refresh-cw",
    children: (
      <>
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
      </>
    ),
  },

  save: {
    class: "lucide lucide-save-icon lucide-save",
    children: (
      <>
        <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
        <path d="M7 3v4a1 1 0 0 0 1 1h7" />
      </>
    ),
  },
  search: {
    class: "lucide lucide-search-icon lucide-search",
    children: (
      <>
        <path d="m21 21-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </>
    ),
  },
  trash2: {
    class: "lucide lucide-trash2-icon lucide-trash-2",
    children: (
      <>
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M3 6h18" />

        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </>
    ),
  },
  upload: {
    class: "lucide lucide-upload-icon lucide-upload",
    children: (
      <>
        <path d="M12 3v12" />
        <path d="m17 8-5-5-5 5" />
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      </>
    ),
  },
  x: {
    class: "lucide lucide-x-icon lucide-x",
    children: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
  },
} as const;

export type TIconName = keyof typeof SVG_ICONS;
