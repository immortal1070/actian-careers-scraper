import {Injectable} from '@nestjs/common'
import {ActianClient} from './app.client'
import {JobsResultDto} from './dtos'
import {AppHtmlParser} from './app.html-parser'

@Injectable()
export class AppService {
  constructor(
    private readonly actianClient: ActianClient,
    private readonly xmlParser: AppHtmlParser
  ) {}

  async scrapActianCareers(department: string): Promise<JobsResultDto> {
    return this.actianClient
      .loadCareersPage()
      .then((result) => this.xmlParser.parseJobPositions(result, department))
  }
}
