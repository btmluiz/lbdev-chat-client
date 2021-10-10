import useSound from "use-sound";
import { HookOptions, ReturnedValue } from "use-sound/dist/types";

export type WithUseSoundProps = {
  sound: ReturnedValue;
};

export function withUseSound(
  src: string | string[],
  hookOptions?: HookOptions
) {
  return (Component: any) => (props: any) => {
    const soundHook = useSound(src, hookOptions);

    return <Component sound={soundHook} {...props} />;
  };
}
