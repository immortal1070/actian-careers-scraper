import {Test, TestingModule} from '@nestjs/testing'
import {INestApplication} from '@nestjs/common'
import * as request from 'supertest'
import {AppModule} from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get(`/scraper/actian/careers?department=Customer+Experience`)
      .expect(200)
      .expect('["Content Strategist"]')
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
        .get(`/scraper/actian/careers`)
        .expect(400)
        .expect('{"statusCode":400,"message":"Department is required!"}')
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
        .get(`/scraper/actian/careers?department=Customer+Experience12312312312312`)
        .expect(404)
        .expect('{"statusCode":404,"message":"No department found!"}')
  })
})
