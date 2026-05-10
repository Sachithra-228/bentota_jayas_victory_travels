declare module "@/components/StaggeredMenu" {
  import * as React from "react";

  type MenuItem = {
    label: string;
    ariaLabel?: string;
    link: string;
  };

  type SocialItem = {
    label: string;
    link: string;
  };

  type Props = {
    position?: "left" | "right";
    colors?: string[];
    items?: MenuItem[];
    socialItems?: SocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    className?: string;
    logoUrl?: string;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    accentColor?: string;
    changeMenuColorOnOpen?: boolean;
    isFixed?: boolean;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
  };

  const StaggeredMenu: React.ComponentType<Props>;
  export default StaggeredMenu;
}
