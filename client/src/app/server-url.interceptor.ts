import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';

export const IS_INTERCEPTOR_SERVER_URL = new HttpContextToken<boolean>(() => true);

export const serverUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(IS_INTERCEPTOR_SERVER_URL)) {
    console.log(`Change URL Request: ${req.url} to /api${req.url}`);

    const cloneRequest = req.clone({ url: `/api${req.url}` });

    return next(cloneRequest);
  }

  return next(req);
};