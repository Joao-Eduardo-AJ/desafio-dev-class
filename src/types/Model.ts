export interface IModel {
	error: false,
	message: string,
	response: {
		Modelos: [
			{
				Label: string,
				Value: number
			}
		],
        Anos: [
			{
				Label: string,
				Value: string
			},
	    ]
    },
	api_limit: number,
	api_limit_for: string,
	api_limit_used: number
}