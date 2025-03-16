import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function tokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const headerKey = 'X-MBX-APIKEY';
  const headerValue = 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A';

  return next(
    req.clone({
      headers: req.headers.append(headerKey, headerValue),
    })
  );
}
