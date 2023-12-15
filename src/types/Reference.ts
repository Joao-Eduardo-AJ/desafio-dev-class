export interface IReference{
	error: boolean,
	message: string,
	response: [
		{
			Codigo: number,
			Mes: string
		}
	],
	api_limit: number,
	api_limit_for: string,
	api_limit_used: number
}