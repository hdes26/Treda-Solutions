import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from '../core/dto/create-order.dto';
import { UpdateOrderStatusDto } from '../core/dto/update-order-status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order, Product, User, OrderProduct } from 'src/database/core/entities';
import { LoggerService } from 'src/settings/logger';
import { OrderStatusEnum } from 'src/database/core/enum';
import { FindOrdersDto } from '../core/dto/find-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderRepository: typeof Order,
    @InjectModel(User)
    private readonly usersRepository: typeof User,
    @InjectModel(Product)
    private readonly productRepository: typeof Product,
    @InjectModel(OrderProduct)
    private readonly orderProductModel: typeof OrderProduct,
    private readonly logger: LoggerService,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    try {
      const user = await this.usersRepository.findByPk(userId);
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found.`);
      }

      const productIds = createOrderDto.products.map(
        (product) => product.productId,
      );

      const products = await this.productRepository.findAll({
        where: { id: productIds },
      });

      if (products.length !== productIds.length) {
        const invalidProducts = productIds.filter(
          (id) => !products.some((product) => product.id === id),
        );
        throw new NotFoundException(
          `Products not found: ${invalidProducts.join(', ')}`,
        );
      }

      const totalPrice = createOrderDto.products.reduce(
        (sum, { productId, quantity }) => {
          const product = products.find((p) => p.id === productId);
          if (!product) return sum;
          return sum + Number(product.price) * Number(quantity);
        },
        0,
      );

      const order = await this.orderRepository.sequelize.transaction(
        async (transaction) => {
          const newOrder = await this.orderRepository.create(
            {
              user_id: userId,
              total_price: totalPrice,
              status: OrderStatusEnum.PENDING,
            },
            { transaction },
          );

          const orderProducts = createOrderDto.products.map(
            ({ productId, quantity }) => {
              const product = products.find((p) => p.id === productId);
              return {
                order_id: newOrder.id,
                product_id: productId,
                quantity: Number(quantity),
                total_price: Number(product.price) * Number(quantity),
              };
            },
          );

          await this.orderProductModel.bulkCreate(orderProducts, {
            transaction,
          });

          for (const { productId, quantity } of createOrderDto.products) {
            const product = products.find((p) => p.id === productId);
            if (product.stock < Number(quantity)) {
              throw new ConflictException(
                `Insufficient stock for product '${product.name}'. Available stock: ${product.stock}`,
              );
            }

            await this.productRepository.update(
              { stock: product.stock - Number(quantity) },
              { where: { id: productId }, transaction },
            );
          }

          return newOrder;
        },
      );

      return order;
    } catch (error) {
      this.logger.error(OrderService.name, error);
      throw error;
    }
  }

  async findAll(findOrdersDto: FindOrdersDto) {
    const { page = 1, limit = 10, status } = findOrdersDto;

    try {
      const offset = (page - 1) * limit;

      const whereClause: any = {};
      if (status) {
        whereClause.status = status;
      }

      const { rows, count } = await this.orderRepository.findAndCountAll({
        where: whereClause,
        include: [{ model: User }, { model: OrderProduct, include: [Product] }],
        limit,
        offset,
        order: [['created_at', 'DESC']],
      });

      return {
        data: rows,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit),
        },
      };
    } catch (error) {
      this.logger.error(OrderService.name, error.message);
      throw error;
    }
  }

  async findAllUsersOrders(userId: string) {
    try {
      const user = await this.usersRepository.findByPk(userId);
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found.`);
      }

      return this.orderRepository.findAll({
        where: { user_id: userId },
        include: [{ model: OrderProduct, include: [Product] }],
      });
    } catch (error) {
      this.logger.error(OrderService.name, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderRepository.findByPk(id, {
        include: [{ model: User }, { model: OrderProduct, include: [Product] }],
      });

      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found.`);
      }

      return order;
    } catch (error) {
      this.logger.error(OrderService.name, error);
      throw error;
    }
  }

  async update(id: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    try {
      const order = await this.orderRepository.findByPk(id);
      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found.`);
      }

      return order.update(updateOrderStatusDto);
    } catch (error) {
      this.logger.error(OrderService.name, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const order = await this.orderRepository.findByPk(id);
      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found.`);
      }

      await order.destroy();
    } catch (error) {
      this.logger.error(OrderService.name, error);
      throw error;
    }
  }
}
