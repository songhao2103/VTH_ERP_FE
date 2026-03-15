export { DropdownProvider } from "./context/DropdownContext";
export { useDropdown } from "./hooks/useDropdown";

export { Dropdown } from "./components/Dropdown";
export { DropdownRoot } from "./components/DropdownRoot";
export { DropdownTrigger } from "./components/DropdownTrigger";
export { DropdownContent } from "./components/DropdownContent";
export { DropdownItem } from "./components/DropdownItem";
export { DropdownSeparator } from "./components/DropdownSeparator";
export { DropdownGroup } from "./components/DropdownGroup";

export type {
  DropdownContentProps,
  DropdownGroupProps,
  DropdownItemProps,
  DropdownPlacement,
  DropdownRootProps,
  DropdownSeparatorProps,
  DropdownTriggerProps,
  DropdownTriggerType,
} from "./types/dropdown.types";

///EX

// <DropdownProvider>
//   <div className="p-10">
//     <Dropdown trigger="click" placement="bottom-start">
//       <Dropdown.Trigger>
//         <button className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white">
//           Open menu
//         </button>
//       </Dropdown.Trigger>

//       <Dropdown.Content className="w-56">
//         <Dropdown.Group label="Actions">
//           <Dropdown.Item>Profile</Dropdown.Item>
//           <Dropdown.Item>Settings</Dropdown.Item>
//         </Dropdown.Group>

//         <Dropdown.Separator />

//         <Dropdown trigger="hover" placement="bottom-end" openDelay={60}>
//           <Dropdown.Trigger>
//             <Dropdown.Item closeOnSelect={false}>
//               More options
//             </Dropdown.Item>
//           </Dropdown.Trigger>

//           <Dropdown.Content className="w-48">
//             <Dropdown.Item>Duplicate</Dropdown.Item>
//             <Dropdown.Item>Archive</Dropdown.Item>
//             <Dropdown.Item className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10">
//               Delete
//             </Dropdown.Item>
//           </Dropdown.Content>
//         </Dropdown>
//       </Dropdown.Content>
//     </Dropdown>
//   </div>
// </DropdownProvider>

//Context menu trigger example =========================================

//  <DropdownProvider>
//       <Dropdown trigger="contextMenu" placement="bottom-start">
//         <Dropdown.Trigger>
//           <div className="w-80 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 text-white">
//             <div className="text-lg font-semibold">Project Proposal.pdf</div>
//             <div className="mt-1 text-sm text-white/60">
//               Right click this card
//             </div>
//           </div>
//         </Dropdown.Trigger>

//         <Dropdown.Content className="w-60">
//           <Dropdown.Group label="File">
//             <Dropdown.Item>Open</Dropdown.Item>
//             <Dropdown.Item>Rename</Dropdown.Item>
//             <Dropdown.Item>Download</Dropdown.Item>
//           </Dropdown.Group>

//           <Dropdown.Separator />

//           <Dropdown.Group label="Danger zone">
//             <Dropdown.Item className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10">
//               Move to trash
//             </Dropdown.Item>
//           </Dropdown.Group>
//         </Dropdown.Content>
//       </Dropdown>
//     </DropdownProvider>

///Controlled mode example ===========================

// export function ControlledDropdownExample() {
//   const [open, setOpen] = useState(false);

//   return (
//     <DropdownProvider>
//       <Dropdown
//         trigger="click"
//         open={open}
//         onOpenChange={setOpen}
//         placement="bottom-center"
//       >
//         <Dropdown.Trigger>
//           <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
//             Controlled dropdown
//           </button>
//         </Dropdown.Trigger>

//         <Dropdown.Content className="w-52">
//           <Dropdown.Item onClick={() => console.log("Edit")}>Edit</Dropdown.Item>
//           <Dropdown.Item onClick={() => console.log("Share")}>Share</Dropdown.Item>
//         </Dropdown.Content>
//       </Dropdown>
//     </DropdownProvider>
//   );
// }
