"use client"
import { Select } from "@/components/select";
import { useAppContext } from "@/context";
// import { IFipe } from "@/types";

export default function Dash() {
  const { 
    referenceOptions,
    brandOptions,
    modelOptions,
    yearOptions,
    handleReference,
    handleType,
    handleBrand,
    handleModel,
    handleYear,
    fipe
  } = useAppContext();

  // descomente e tire a "fipe" da desestruturação 
  // do context para ver a exibição das infos em tela...
/* const fipe: IFipe = {
    error: false,
    message: "Requisição processada com sucesso",
    response: {
      Valor: "R$ 21.431,00",
      Marca: "Fiat",
      Modelo: "Palio 1.0 Celebr. ECONOMY F.Flex 8V 2p",
      AnoModelo: 2014,
      Combustivel: 2014,
      CodigoFipe: "001268-8",
      MesReferencia: "maio de 2021 ",
      TipoVeiculo: 1,
      SiglaCombustivel: "G"
    },
    api_limit: 100,
    api_limit_for: "request",
    api_limit_used: 8
  } */

  return (
    <main className="flex flex-col justify-center items-center w-screen overflow-hidden pt-8 gap-8">
        <h1 className="text-3xl text-primaryDark">Busque pela FIPE de qualquer carro!</h1>
      <div className="flex gap-4">
      <Select 
        name="reference" 
        options={referenceOptions}
        label="Tabela referência"
        onClick={(e) => handleReference(parseInt(e.currentTarget.value))}/>
      <Select 
        name="type" 
        options={[{Value: 1, Label: "1"}, {Value: 2, Label: "2"}, {Value: 3, Label: "3"}]}
        label="Tipo do veículo" 
        onClick={(e) => handleType(parseInt(e.currentTarget.value))}/>
       <Select 
        name="brand"
        options={brandOptions}
        label="Marca"
        onClick={(e) => handleBrand(parseInt(e.currentTarget.value))}
        />
      <Select 
        name="model"
        options={modelOptions}
        label="Modelo"
        onClick={(e) => handleModel(parseInt(e.currentTarget.value))}
        />
      <Select 
        name="year"
        options={yearOptions}
        label="Ano"
        onClick={(e) => handleYear(e.currentTarget.value)}
        />
      </div>
      {fipe && (
        <div className="border border-primaryDefault rounded-lg p-4">
          <p className="text-xl font-semibold">{fipe.message}</p>
          <p className="font-semibold">Carro</p>
          <p>{`${fipe.response.Marca} ${fipe.response.Modelo}`}</p>
          <div className="flex gap-2">
            <p className="font-semibold">Ano:</p>
            <p>{`${fipe.response.AnoModelo}`}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Fipe:</p>
            <p>{`${fipe.response.Valor}`}</p>
          </div>
        </div>
        )}
    </main>
  );
}
