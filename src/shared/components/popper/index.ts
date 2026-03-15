import PopperRoot from "@/shared/components/popper/PopperRoot";
import PopperTrigger from "@/shared/components/popper/PopperTrigger";
import PopperContent from "@/shared/components/popper/PopperContent";
import PopperArrow from "@/shared/components/popper/PopperArrow";

export const Popper = Object.assign(PopperRoot, {
  Trigger: PopperTrigger,
  Content: PopperContent,
  Arrow: PopperArrow,
});

export { PopperRoot, PopperTrigger, PopperContent, PopperArrow };
export * from "@/shared/components/popper/popper.type";
export * from "@/shared/components/popper/popper.context";
