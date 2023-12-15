import { RequestApi } from "@/api/AppApi";
import { IAuth, IAuthParam, IBodyAll, IBodyBrand, IBodyModel, IBodyModelByYear, IBodyYearModel, IBrand, IFipe, IFormData, IModel, IReference, IYearModel } from "@/types";
import { AxiosInstance, AxiosRequestConfig } from "axios";

class AppService {
  public api: AxiosInstance;
  
  constructor(api: AxiosInstance) {
    this.api = api;
  }

  public login(data: IFormData): Promise<IAuth> {
    return this.api.post("login", data);
  }

  public getReference(auth: IAuthParam, deviceToken: string): Promise<IReference> {
    const headers: AxiosRequestConfig['headers'] = {
      'DeviceToken': deviceToken,
      'Authorization': `${auth.type} ${auth.token}`
  };
    return this.api.post("vehicles/ConsultarTabelaDeReferencia", {}, { headers });
  }

  public getBrand(auth: IAuthParam, deviceToken: string, body: IBodyBrand): Promise<IBrand> {
    const headers = {
      'DeviceToken': deviceToken,
      'Authorization': `${auth.type} ${auth.token}`
    };
    return this.api.post("vehicles/ConsultarMarcas", body, { headers });
  }

  public getModel(auth: IAuthParam, deviceToken: string, body: IBodyModel): Promise<IModel> {
    const headers = {
      'DeviceToken': deviceToken,
      'Authorization': `${auth.type} ${auth.token}`
    };
    return this.api.post("vehicles/ConsultarModelos", body, { headers });
  }

  public getYearModel(auth: IAuthParam, deviceToken: string, body: IBodyYearModel): Promise<IYearModel> {
    const headers = {
      'DeviceToken': deviceToken,
      'Authorization': `${auth.type} ${auth.token}`
    };
    return this.api.post("vehicles/ConsultarAnoModelo", body, { headers });
  }

  public getModelByYear(auth: IAuthParam, deviceToken: string, body: IBodyModelByYear): Promise<IYearModel> {
    const headers = {
      'DeviceToken': deviceToken,
      'Authorization': `${auth.type} ${auth.token}`
    };
    return this.api.post("vehicles/ConsultarModelosAtravesDoAno", body, { headers });
  }

  public getFipeByParams(auth: IAuthParam, deviceToken: string, body: IBodyAll): Promise<IFipe> {
    const headers = {
      'DeviceToken': deviceToken,
      'Authorization': `${auth.type} ${auth.token}`
    };
    return this.api.post("vehicles/ConsultarValorComTodosParametros", body, { headers });
  }
}

const requestApi = new RequestApi();

export const appService = new AppService(
  requestApi.getInstance()
);
