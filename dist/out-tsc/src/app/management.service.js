import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Scadenza } from './scadenza.model';
import { DeadlineStatus } from './deadlineStatus.model';
import { ModalController } from '@ionic/angular';
import { UnitComponent } from './unit/unit.component';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
;
var ManagementService = /** @class */ (function () {
    function ManagementService(modalCtrl, http) {
        this.modalCtrl = modalCtrl;
        this.http = http;
        this._books = [
            {
                titolo: 'libro di matematica',
                autore: 'un pazzo',
                pagine: 210
            },
            {
                titolo: 'libro di storia',
                autore: 'lucio',
                pagine: 144
            },
            {
                titolo: 'libro di geografia',
                autore: 'marco',
                pagine: 320
            },
        ];
        this._unitlist = new BehaviorSubject([]);
        this.myProp = 'miaProprieta';
    }
    ManagementService.prototype.ngOnInit = function () {
        this.sortUnitList();
    };
    ManagementService.prototype.sortUnitList = function () {
        var _this = this;
        this.unitlist.pipe(take(1)).subscribe(function (units) {
            _this._unitlist.next(units.sort(function (unitA, unitB) {
                return unitA.createdOn > unitB.createdOn ? -1 : 1;
            }));
        });
    };
    Object.defineProperty(ManagementService.prototype, "unitlist", {
        get: function () {
            return this._unitlist.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManagementService.prototype, "books", {
        get: function () {
            return this._books;
        },
        enumerable: true,
        configurable: true
    });
    ManagementService.prototype.addBook = function (form) {
        var myBook = {
            titolo: form.value.title,
            autore: form.value.autore,
            pagine: form.value.pagine
        };
        this._books.push(myBook);
        // this.modalCtrl.dismiss();
        console.log('questi sono i books: ', this._books);
    };
    ManagementService.prototype.addUnit = function (form) {
        var _this = this;
        var generatedId;
        var today = new Date();
        console.log('today is: ', today);
        var in2days = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 2);
        var add5days = new Date(in2days.getTime() + 1000 * 60 * 60 * 24 * 5);
        var add7days = new Date(add5days.getTime() + 1000 * 60 * 60 * 24 * 7);
        var add13days = new Date(add7days.getTime() + 1000 * 60 * 60 * 24 * 13);
        var add20days = new Date(add13days.getTime() + 1000 * 60 * 60 * 24 * 20);
        // const appuntamenti: Date[] = [in2days, add5days, add7days, add13days, add20days];
        var myUnit = new UnitComponent(null, form.value.riferimenti, form.value.libro, form.value.chapterFrom, form.value.chapterTo, today, [
            new Scadenza(in2days, DeadlineStatus.Due),
            new Scadenza(add5days, DeadlineStatus.Due),
            new Scadenza(add7days, DeadlineStatus.Due),
            new Scadenza(add13days, DeadlineStatus.Due),
            new Scadenza(add20days, DeadlineStatus.Due)
        ]);
        return this.http.post('https://study-planner-e6035.firebaseio.com/units.json', myUnit)
            .pipe(switchMap(function (res) {
            generatedId = res.name;
            myUnit.id = generatedId;
            console.log('ho ottenuto: ', res);
            return _this.unitlist;
        }), take(1)
        // tap(units => {
        //   myUnit.id = generatedId;
        //   this._unitlist.next(units.concat(myUnit));
        // })
        )
            .subscribe(function (res) {
            console.log('ora sì ho ottenuto: ', res);
            _this._unitlist.next(res.concat(myUnit));
            console.log('ora myUnit è: ', myUnit);
        });
        // this.unitlist.pipe(take(1)).subscribe(units => {
        //   this._unitlist.next(units.concat(myUnit));
        // });
        // this.unitlist.push(myUnit);
        // this.modalCtrl.dismiss();
        this.sortUnitList();
        console.log('le units ora sono: ', this.unitlist);
    };
    ManagementService.prototype.fetchUnits = function () {
        var _this = this;
        return this.http.get('https://study-planner-e6035.firebaseio.com/units.json')
            .pipe(
        // tap(resData => {
        //   console.log('queste sono le units nel database: ', resData);
        //   return resData;
        // }),
        map(function (resData) {
            var units = [];
            for (var key in resData) {
                if (resData.hasOwnProperty(key)) {
                    var myAppuntamenti = [];
                    // for(let appuntamento of resData.key.appuntamenti){
                    //   myAppuntamenti.push(new Scadenza(new Date(appuntamento.giorno), appuntamento.status));
                    // }
                    units.push(new UnitComponent(key, resData[key].title, resData[key].libro, resData[key].chapterFrom, resData[key].chapterTo, new Date(resData[key].createdOn), resData[key].appuntamenti
                    // myAppuntamenti
                    ));
                }
            }
            return units;
        }), tap(function (units) {
            _this._unitlist.next(units);
        }));
    };
    ManagementService.prototype.getUnit = function (unitName) {
        return this.unitlist.pipe(take(1), map(function (units) {
            return tslib_1.__assign({}, units.find(function (unit) { return unit.title == unitName; }));
        }));
        // return this.unitlist.find(unit => {
        //   return unit.title == unitName;
        // })
    };
    ManagementService.prototype.updateUnit = function (myUnit) {
        var _this = this;
        this.unitlist.pipe(take(1)).subscribe(function (units) {
            var newUnits = units.filter(function (unit) { return unit.title != myUnit.title; });
            newUnits = newUnits.concat(myUnit);
            _this._unitlist.next(newUnits);
            // console.log('ora la unitlist aggiornata è: ', newUnits);
            _this.unitlist.pipe(take(1)).subscribe(function (units) {
                _this.sortUnitList();
                console.log('ora la unitlist aggiornata è: ', units);
            });
        });
    };
    ManagementService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, HttpClient])
    ], ManagementService);
    return ManagementService;
}());
export { ManagementService };
//# sourceMappingURL=management.service.js.map