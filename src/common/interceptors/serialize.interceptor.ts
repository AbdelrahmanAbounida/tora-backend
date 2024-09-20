import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

export interface Response<T> {
  data: T;
}

/** No need for this serializer at the moment , since I will use ClassSerializerInterceptor */

export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new ResponseInterceptor(dto));
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  /**
   * an interceptor to decorate the response content into json like object
   * @param context Returns the *type* of the controller class which the current handler belongs to.
   * @param next  Returns an `Observable` representing the response stream from the route handler
   */

  constructor(private readonly dto: ClassConstructor<T>) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) =>
        plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        }),
      ),
    ); // map used for transformation and tap to apply functions over items like logging
  }
}
