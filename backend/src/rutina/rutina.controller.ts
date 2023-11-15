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
import { CreateRutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('rutina')
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Res() res: any, @Body() createRutinaDto: CreateRutinaDto) {
    const { localId: user_id } = res.req.user;
    return res.send(this.rutinaService.create(user_id, createRutinaDto));
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Res() res: any) {
    const { localId: user_id } = res.req.user;
    return res.send(this.rutinaService.findAll(user_id));
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') rutina_id: string, @Res() res: any) {
    const { localId: user_id } = res.req.user;
    return res.send(this.rutinaService.findOne(rutina_id, user_id));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') rutina_id: string,
    @Res() res: any,
    @Body() updateRutinaDto: UpdateRutinaDto,
  ) {
    const { localId: user_id } = res.req.user;
    return res.send(
      this.rutinaService.update(rutina_id, user_id, updateRutinaDto),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') rutina_id: string, @Res() res: any) {
    const { localId: user_id } = res.req.user;
    return res.send(this.rutinaService.remove(rutina_id, user_id));
  }
}
