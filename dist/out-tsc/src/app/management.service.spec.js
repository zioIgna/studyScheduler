import { TestBed } from '@angular/core/testing';
import { ManagementService } from './management.service';
describe('ManagementService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ManagementService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=management.service.spec.js.map