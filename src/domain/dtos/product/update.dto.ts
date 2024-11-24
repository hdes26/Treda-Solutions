import { PartialType } from '@nestjs/swagger';
import { CreateProductDTO } from './create.dto';

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
