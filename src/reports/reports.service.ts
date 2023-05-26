import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createReport(obj: CreateReportDto, user: User) {
    const report = this.repo.create(obj);
    console.log('User', user);

    report.user = user;
    return this.repo.save(report);
  }

  async updateReport(id: number, attrs: Partial<Report>) {
    const report = await this.repo.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('This report no longer exist.');
    }
    Object.assign(report, attrs);
    return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: id } });
    if (!report) {
      throw new NotFoundException("Report with this id don't exist any more.");
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
