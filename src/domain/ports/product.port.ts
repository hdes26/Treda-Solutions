import { CreateProductDTO, UpdateProductDTO } from '@domain/dtos';

export abstract class ICreateProductUsecase {
  abstract handle(payload: CreateProductDTO): Promise<any>;
}

export abstract class IUpdateProductUsecase {
  abstract handle(payload: UpdateProductDTO): Promise<any>;
}
