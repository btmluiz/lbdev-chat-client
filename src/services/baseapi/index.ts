import AbstractBaseService from "@services/base";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import qs from "qs";

export type ServiceType = {
  instance: any;
  configs?: AxiosRequestConfig;
};

type Endpoints = {
  [x: string]: string;
};

export interface BaseApiServiceConstructor {
  new (): AbstractBaseApiService;
  _endpoints: any;
}

abstract class AbstractBaseApiService extends AbstractBaseService<ServiceType> {
  public static instance: AbstractBaseApiService;
  protected api!: AxiosInstance;
  public static endpointUrl: string;

  public endpoints: Endpoints = {};
  protected resolveParams = AbstractBaseApiService.resolveParams;

  protected initialize(
    { instance, configs }: ServiceType = { instance: this }
  ): this {
    this.endpoints = (this.constructor as BaseApiServiceConstructor)._endpoints;

    this.api = axios.create(configs);

    this.setBaseUrl();

    this.api.interceptors.request.use(
      AbstractBaseApiService.serializeBeforeSend,
      AbstractBaseApiService.serializeBeforeSendError
    );

    this.api.interceptors.response.use(
      this.checkStatus,
      AbstractBaseApiService.checkStatusError
    );

    return this;
  }

  public static resolveParams(params: any) {
    let result = "";

    Object.keys(params).forEach((value, index) => {
      if (index > 0) result += "&";
      result += `${value}=${params[value]}`;
    });

    return result;
  }

  public setBaseUrl(): void {
    this.api.defaults.baseURL = process.env.REACT_APP_API_URL;
  }

  private static serializeBeforeSend(
    configSerialize: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> | AxiosRequestConfig {
    configSerialize.data = qs.stringify(configSerialize.data);
    return configSerialize;
  }

  private static serializeBeforeSendError(
    error: any
  ): Promise<AxiosError> | any {
    return Promise.reject(error);
  }

  private async checkStatus(response: AxiosResponse<any>) {
    const { status } = response;

    if (status >= 200 && status < 300) {
      return response;
    }

    if (status === 401 || status === 403) {
      this.expireTokenFunction && this.expireTokenFunction();
    }

    return Promise.reject(response);
  }

  private static async checkStatusError(error: AxiosError<any>): Promise<any> {
    const { response } = error;

    return Promise.reject(response);
  }

  public expireTokenFunction: () => void = () => null;

  public withParams(endpoint: string, params: any = {}) {
    return `${endpoint}?${this.resolveParams(params)}`;
  }
}

export default AbstractBaseApiService;
