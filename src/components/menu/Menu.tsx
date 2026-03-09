import MenuInner from "@/components/menu/MenuInner";
import MenuProvider from "@/components/menu/MenuProvider";
import React from "react";

const Menu = () => {
  return (
    <MenuProvider>
      <MenuInner />
    </MenuProvider>
  );
};

export default Menu;
