import AbstractBaseService from "@services/base";
import * as H from "history";

export interface NavigationProps {
  setNavigator: (navigator: H.History) => void;
  navigate(route: string, state?: any): void;
  replace(route: string, state?: any): void;
  back(): void;
}

class Navigation extends AbstractBaseService implements NavigationProps {
  public static instance: Navigation;
  private _navigator!: H.History;

  protected initialize(data?: {}) {
    return this;
  }

  setNavigator(navigator: H.History) {
    this._navigator = navigator;
  }

  public navigate(route: string, state: any = {}) {
    this._navigator.push(route, state);
  }

  public replace(route: string, state: any = {}) {
    this._navigator.replace(route, state);
  }

  public back() {
    this._navigator.goBack();
  }
}

const NavigationService = new Navigation();
export default NavigationService;
