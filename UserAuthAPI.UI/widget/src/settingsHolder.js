import Http from './http'

export class SettingsManager{
   static ReadSettings(settingsFetcher){
        Http.get('/widget-settings.json').then((res)=>{
            
            settingsFetcher(res);
        })
    }
   
}
