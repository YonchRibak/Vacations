import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig = {
    providers: [provideRouter(routes), provideHttpClient()],
    
    backendUrl: "http://localhost:4000/api/____"
};
