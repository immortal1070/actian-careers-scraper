import {Injectable, Logger} from '@nestjs/common'
import {AnyNode} from 'domhandler'
import {JobsResultDto} from './dtos'

const cheerio = require('cheerio')

@Injectable()
export class AppHtmlParser {
  private readonly logger = new Logger(AppHtmlParser.name)

  parseJobPositions(careersPage: string, department: string): JobsResultDto {
    this.logger.debug('scrapping careers page...')
    const $ = cheerio.load(careersPage)
    const jobPostings: string[] = []
    let jobDepartmentFound = false
    $('.lever-jobs-wrapper')
      .find('.job-posting')
      .each((index: number, element: AnyNode) => {
        if (jobDepartmentFound) {
          return
        }
        const jobDepartment = $(element)
          .find('.job-heading')
          .find('.department')
          .text()
        if (jobDepartment != department) {
          return
        }
        jobDepartmentFound = true
        this.logger.debug(`found jobDepartment=${jobDepartment}`)
        $(element)
          .find('.job-content')
          .find('.listing')
          .each((index: number, element: AnyNode) => {
            jobPostings.push($(element).find('.job-name').text())
          })
        this.logger.debug(`found jobPostings=${jobPostings}`)
      })
    return new JobsResultDto(jobDepartmentFound, jobPostings)
  }
}
