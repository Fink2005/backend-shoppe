import { Body, Controller, Param, UseGuards, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Product } from "src/schemas/product.schema";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('find')
    async getAllProducts() {
        return this.productService.findAllProducts();
    }

    @Post('add')
    async addProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.addProduct(createProductDto);
    }
}