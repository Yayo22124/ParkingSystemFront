export interface iHumiditySensor {
  id: string;
  temperature: number;
  humidity: number;
  status: boolean;
  registeredAt: string;
}
