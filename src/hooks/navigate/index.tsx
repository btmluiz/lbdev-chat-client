import NavigationService, { NavigationProps } from "@services/navigation";

export function useNavigation(): NavigationProps {
  return {
    navigate: (route, state) => NavigationService.navigate(route, state),
    setNavigator: (navigator) => NavigationService.setNavigator(navigator),
    back: () => NavigationService.back(),
    replace: (route, state) => NavigationService.replace(route, state),
  };
}

export const withNavigation = (Component: any) => {
  return (props: any) => {
    const navigation = useNavigation();

    return <Component {...navigation} {...props} />;
  };
};
