export interface IBodyBrand {
    codigoTabelaReferencia: string | number,
    codigoTipoVeiculo: string | number,
}

export interface IBodyModel extends IBodyBrand {
    codigoMarca: number,
}

export interface IBodyYearModel extends IBodyModel {
    codigoModelo: number
}

export interface IBodyModelByYear extends IBodyModel {
    ano: string,
    codigoTipoCombustivel: number,
    anoModelo: number,
}

export interface IBodyAll extends IBodyYearModel, IBodyModelByYear {}