import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {HttpModule} from '@nestjs/axios'
import {ActianClient} from './app.client'
import {AppHtmlParser} from './app.html-parser'

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, ActianClient, AppHtmlParser]
})
export class AppModule {}
