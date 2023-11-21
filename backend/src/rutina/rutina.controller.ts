import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { RutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('rutina')
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Res() res: any, @Body() createRutinaDto: RutinaDto) {
    const { _id: user_id } = res.req.user;
    return res.send(await this.rutinaService.create(user_id, createRutinaDto));
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') rutina_local_id: string, @Res() res: any) {
    const { _id: user_id } = res.req.user;
    return res.send(await this.rutinaService.findOne(rutina_local_id, user_id));
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Res() res: any) {
    const { _id: user_id } = res.req.user;
    return res.send(await this.rutinaService.findAllByUser(user_id));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') rutina_id: string,
    @Res() res: any,
    @Body() updateRutinaDto: UpdateRutinaDto,
  ) {
    const { _id: user_id } = res.req.user;
    return res.send(
      await this.rutinaService.update(rutina_id, user_id, updateRutinaDto),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Res() res: any, @Param('id') rutina_id: string) {
    const { _id: user_id } = res.req.user;

    return res.send(await this.rutinaService.remove(rutina_id, user_id));
  }
}
