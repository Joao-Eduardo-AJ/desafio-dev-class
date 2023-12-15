/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { appService } from "@/service/AppService";
import { IAuth, IAuthParam, IBrand, IFipe, IFormData, IReference } from "@/types";
import { log } from "console";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

interface ISelectOption {
  Value: number | string;
  Label: string;
}

interface IAppContext {
  handleLogin: (formData: IFormData) => void;
  referenceOptions: ISelectOption[];
  brandOptions: ISelectOption[];
  modelOptions: ISelectOption[];
  yearOptions: ISelectOption[];

  handleReference: (param: number) => void;
  handleType: (param: number) => void;
  handleBrand: (param: number) => void;
  handleModel: (param: number) => void;
  handleYear: (param: string) => void;

  fipe?: IFipe;
}

interface IApp {
  children: ReactNode;
}

const AppContext = createContext({} as IAppContext);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }: IApp) => {
  const [auth, setAuth] = useState<IAuth>();

  const [referenceOptions, setReferenceOptions] = useState<ISelectOption[]>([])
  const [brandOptions, setBrandOptions] = useState<ISelectOption[]>([]);
  const [modelOptions, setModelOptions] = useState<ISelectOption[]>([]);
  const [yearOptions, setYearOptions] = useState<ISelectOption[]>([]);
  
  const [reference, setReference] = useState(0);
  const [type, setType] = useState(0);
  const [brand, setBrand] = useState(0);
  const [model, setModel] = useState(0);
  const [year, setYear] = useState("");

  const [fipe, setFipe] = useState<IFipe>();

  const router = useRouter();

  async function handleLogin(formData: IFormData) { 
    try {
      const authData = await appService.login(formData);
      authData.user.password = formData.password;
      setAuth(authData);
      if (!authData.error) {
        localStorage.setItem("authData", JSON.stringify(authData))
        router.push("/dash")
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleFakeLogin(data: IAuth) {
    if (!!data.authorization) {
      setAuth(data);
      router.push("/dash")
    }
  }

  async function getReferenceTableOptions() {
    if (!auth) return;
    console.log(auth.authorization);
    try {
      const buffer = await appService.getReference(auth.authorization, auth.user.devices[0].device_token);
      const options: ISelectOption[] = buffer.response.map(option => ({Value: option.Codigo, Label: option.Codigo.toString()}))
      setReferenceOptions(options);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBrandOptions() {
    if (!auth) return;
    try {
      const buffer = await appService.getBrand(auth.authorization, auth.user.devices[0].device_token, {codigoTabelaReferencia: reference, codigoTipoVeiculo: type})
      const options: ISelectOption[] = buffer.response.map(option => ({Value: parseInt(option.Value), Label: option.Label}))
      setBrandOptions(options);
    } catch (error) {
      console.log(error);
    }
  }

  async function getModels() {
    if (!auth) return;
    try {
      const buffer = await appService.getModel(auth.authorization, auth.user.devices[0].device_token, {codigoTabelaReferencia: reference, codigoTipoVeiculo: type, codigoMarca: brand})
      const options: ISelectOption[] = buffer.response.Modelos;
      setModelOptions(options);
    } catch (error) {
      console.log(error);
    }
  }

  async function getYearModel() {
    if (!auth) return;
    try {
      const buffer = await appService.getYearModel(auth.authorization, auth.user.devices[0].device_token, {codigoTabelaReferencia: reference, codigoTipoVeiculo: type, codigoMarca: brand, codigoModelo: model})
      const options: ISelectOption[] = buffer.response;
      setYearOptions(options);
    } catch (error) {
      console.log(error);
    }
  }

  async function getFipe() {
    if (!auth) return;
    try {
      const buffer = await appService.getFipeByParams(auth.authorization, auth.user.devices[0].device_token, {codigoTabelaReferencia: reference, codigoTipoVeiculo: type, codigoMarca: brand, codigoModelo: model, ano: year, anoModelo: parseInt(year.slice(0, 4)), codigoTipoCombustivel: parseInt(year.slice(-1))})
      setFipe(buffer);
    } catch (error) {
      console.log(error);
    }
  }

  const handleReference = (tableRef: number) => setReference(tableRef);

  const handleType = (typeNumber: number) => setType(typeNumber);

  const handleBrand = (selectedBrand: number) => setBrand(selectedBrand);

  const handleModel = (selectedModel: number) => setModel(selectedModel);

  const handleYear = (selectedYear: string) => setYear(selectedYear);

  useEffect(() => {
    const buffer = localStorage.getItem("authData")
    if (!!buffer) {
      const authJson: IAuth = JSON.parse(buffer);
      handleFakeLogin(authJson);
    }
  }, [])

  useEffect(() => {
    if (auth) {
      getReferenceTableOptions();
    }
  }, [auth])

  useEffect(() => {
    if (reference && type && auth) {
      getBrandOptions();
    }
  }, [reference, type, auth])

  useEffect(() => {
    if (brand) {
      getModels();
    }
  }, [brand])

  useEffect(() => {
    if (model) {
      getYearModel();
    }
  }, [model])

  useEffect(() => {
    if (year) {
      getFipe();
    }
  }, [year])

  return (
    <AppContext.Provider
      value={{
        referenceOptions,
        brandOptions,
        modelOptions,
        yearOptions,
        
        handleLogin,
        handleReference,
        handleType,
        handleBrand,
        handleModel,
        handleYear,

        fipe
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
