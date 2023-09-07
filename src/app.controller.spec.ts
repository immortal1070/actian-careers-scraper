import {Test, TestingModule} from '@nestjs/testing'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {HttpModule} from "@nestjs/axios";
import {ActianClient} from "./app.client";
import {AppHtmlParser} from "./app.html-parser";
const fs = require('fs');

describe('AppController', () => {
    let appHtmlParser: AppHtmlParser

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            controllers: [AppController],
            providers: [AppService, ActianClient, AppHtmlParser]
        }).compile()

        appHtmlParser = app.get<AppHtmlParser>(AppHtmlParser)
    })

    describe('root', () => {
        it('should return "correct for Engineering"', () => {
            const testPage:string = fs.readFileSync(`${__dirname}/test/testpage.html`, 'utf8')
            const parseResult = appHtmlParser.parseJobPositions(testPage, 'Customer Experience')
            expect(parseResult.departmentFound).toBe(true)
            expect(parseResult.jobPositions).toStrictEqual(['Content Strategist'])
        })
    })
})
