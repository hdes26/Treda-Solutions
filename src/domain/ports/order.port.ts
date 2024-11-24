import {
  CreateOrderDTO,
  FindOrdersDTO,
  UpdateOrderStatusDTO,
} from '@domain/dtos';

export abstract class ICreateOrderUsecase {
  abstract handle(payload: CreateOrderDTO): Promise<any>;
}

export abstract class IFindOrdersUsecase {
  abstract handle(payload: FindOrdersDTO): Promise<any>;
}

export abstract class IUpdateOrderStatusUsecase {
  abstract handle(payload: UpdateOrderStatusDTO): Promise<any>;
}
