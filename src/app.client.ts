import {Injectable, Logger} from '@nestjs/common'
import {HttpService} from '@nestjs/axios'
import {AxiosError, AxiosResponse} from 'axios'
import {catchError, firstValueFrom, Observable} from 'rxjs'

@Injectable()
export class ActianClient {
  private readonly logger = new Logger(ActianClient.name)
  constructor(private readonly httpService: HttpService) {}

  async loadCareersPage(): Promise<string> {
    const {data} = await firstValueFrom(
      this.httpService
        .get<string>('https://www.actian.com/company/careers/')
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data)
            throw 'Failed to load Actian Careers website!'
          })
        )
    )
    return data
  }
}
