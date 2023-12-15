export interface IFipe {
	error: false,
	message: string,
	response: {
		Valor: string,
		Marca: string,
		Modelo: string,
		AnoModelo: number,
		Combustivel: number,
		CodigoFipe: string,
		MesReferencia: string,
		TipoVeiculo: number,
		SiglaCombustivel: string
	},
	api_limit: number,
	api_limit_for: string,
	api_limit_used: number
}