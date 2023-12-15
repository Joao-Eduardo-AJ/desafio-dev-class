export interface IAuth {
  error: boolean;
  message: string;
  user: {
    email: string;
    password: string;
    devices: [
      {
        device_ip: number;
        device_key: number;
        device_token: string;
        api_info: {
          description: string;
        };
        server: null;
      }
    ];
  };
  invoices: [];
  authorization: IAuthParam;
}

export interface IAuthParam {
  type: string,
  token: string
}
