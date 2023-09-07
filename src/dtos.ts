export class JobsResultDto {
  departmentFound: boolean
  jobPositions: string[]

  constructor(departmentFound: boolean, jobPositions: string[]) {
    this.departmentFound = departmentFound
    this.jobPositions = jobPositions
  }
}
