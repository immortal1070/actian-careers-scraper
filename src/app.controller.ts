import {Controller, Get, HttpException, HttpStatus, Query} from '@nestjs/common'
import {AppService} from './app.service'

@Controller('/scraper/actian/careers')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async scrapActianCareers(
    @Query('department') department: string | undefined
  ): Promise<string[]> {
    if (!department) {
      throw new HttpException('Department is required!', HttpStatus.BAD_REQUEST)
    }
    return this.appService
      .scrapActianCareers(department)
      .then((scrappingResult) => {
        if (!scrappingResult.departmentFound) {
          throw new HttpException('No department found!', HttpStatus.NOT_FOUND)
        }
        return scrappingResult.jobPositions
      })
  }
}
