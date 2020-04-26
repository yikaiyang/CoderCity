import { Controller, Get, Logger } from '@nestjs/common';
import { GitService } from 'src/services/git/git.service';

@Controller('project/:id/branch')
export class BranchController {
    private readonly logger = new Logger(BranchController.name);

    constructor(private gitService: GitService) {}

    @Get()
    getBranches() {
        this.logger.log(`GET: branches`);
        const branches = [];
        for (let [key, value] of this.gitService.repo.gitModel.branches) {
            this.logger.log(`Branch ${value}`);
            branches.push(value);
        }
        return branches;
    }
}
