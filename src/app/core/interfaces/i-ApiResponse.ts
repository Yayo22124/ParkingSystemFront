import { iClient } from './i-client';
import { iEmployee } from './i-employee';
import { iFee } from './i-Fees';
import { iHumiditySensor } from './i-HumiditySensor';
import { iPhotoresistor } from './i-Photoresistor';
import { iProximitySensor } from './i-ProximitySensor';
import { iSlot } from './i-Slot';
import { iVehicle } from './i-Vehicle';

export interface iApiResponse {
  success: boolean;
  message?: string;
  data?: iClient | iEmployee | iVehicle | iFee | iSlot | iHumiditySensor | iProximitySensor | iPhotoresistor | any;
  error?: string;
}
