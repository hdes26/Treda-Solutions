import { CreateCategoryDTO, UpdateCategoryDTO } from '@domain/dtos';

export abstract class ICreateCategoryUsecase {
  abstract handle(payload: CreateCategoryDTO): Promise<any>;
}

export abstract class IUpdateCategoryUsecase {
  abstract handle(payload: UpdateCategoryDTO): Promise<any>;
}
