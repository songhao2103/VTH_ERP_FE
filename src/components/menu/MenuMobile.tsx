import MenuInner from "@/components/menu/MenuInner";
import type { IMobileMenuProps } from "@/components/menu/type";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const HamburgerIcon = ({ open }: { open: boolean }) => {
  return (
    <div className="relative h-5 w-6">
      <span
        className={clsx(
          "absolute left-0 top-0 h-0.5 w-6 bg-current transition-all",
          open && "top-2 rotate-45",
        )}
      />
      <span
        className={clsx(
          "absolute left-0 top-2 h-0.5 w-6 bg-current transition-all",
          open && "opacity-0",
        )}
      />
      <span
        className={clsx(
          "absolute left-0 top-4 h-0.5 w-6 bg-current transition-all",
          open && "top-2 -rotate-45",
        )}
      />
    </div>
  );
};

const MobileMenu: React.FC<IMobileMenuProps> = ({ items }) => {
  const [open, setOpen] = useState(false);
  //   const { pathname } = useLocation();
  const pathname = "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 shadow-sm"
        aria-label="Toggle menu"
      >
        <HamburgerIcon open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="fixed left-0 top-0 z-50 h-full w-[88vw] max-w-sm overflow-y-auto border-r border-zinc-200 bg-white p-4 shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.22 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-base font-semibold text-zinc-900">
                  Navigation
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100"
                >
                  Đóng
                </button>
              </div>

              <MenuInner items={items} theme="light" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
