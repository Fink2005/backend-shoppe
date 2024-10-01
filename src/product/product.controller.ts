import {
  Body,
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async getAllProducts() {
    return this.productService.findAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.addProduct(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async findProductById(@Param('id') id: string) {
    const findProductId = await this.productService.findProductById(id);
    return findProductId;
  }


  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
 async updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
     const updateProductById = await this.productService.updateProductById(id, updateProductDto);
     return updateProductById
  }


  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
 async deleteProduct(@Param('id') id : string) {
  const deleteProduct = await  this.productService.deleteProduct(id)
  console.log(deleteProduct)
  return deleteProduct
  }
}