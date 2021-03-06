import {Component, OnInit} from '@angular/core';
import {Production} from '../../model/production';
import {TextileService} from '../../services/textile.service';
import * as momentJalaali from 'moment-jalaali';
import {DateAdapter} from '@angular/material';
import {DatePickerComponent} from 'ng2-jalali-date-picker';

@Component({
    selector: 'app-production',
    templateUrl: './production.component.html',
    styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

    production: Production = {id: null, prid: null, prName: null, meterPr: null, tarikh: null, descreption: null};
    editProductione: Production = {id: null, prid: null, prName: null, meterPr: null, tarikh: null, descreption: null};
    productions = [];
    prSearched = [];

    config = {
        theme: 'dp-material',
        format: 'YYYY/MM/DD'
    };


    constructor(private textileService: TextileService) {
    }

    getall(data) {
        return this.productions = data;
    }

    ngOnInit() {
        this.textileService.getAllProduction()
            .subscribe(
                (data) => {
                    this.getall(data);
                }
            );

    }

    saveProduction() {
        console.log(this.production);
        const strdate = this.production.tarikh;
        const date = new Date(strdate);
        this.production.tarikh = date;
        this.textileService.saveProduction(this.production).subscribe(
            value => {
                console.log('[POST] create Production successfully');
            }, error => {
                console.log('FAIL to create Production!');
            },
            () => {
                this.textileService.getAllProduction().subscribe(
                    (data) => {
                        this.getall(data);
                    }
                );
                this.clear();
            });
    }

    deleteProduction(production: Production) {
        this.textileService.deleteProduction(production).subscribe(
            value => {
                console.log('[POST] delete Production successfully', value);
            }, error => {
                console.log('FAIL to delete Production!');
            },
            () => {
                this.textileService.getAllProduction().subscribe(
                    (data) => {
                        this.getall(data);
                    }
                );
            });
    }

    editProduction(id, prid, prname, meterpr, tarikh, descreption) {
        this.editProductione.id = id;
        this.editProductione.prid = prid;
        this.editProductione.prName = prname;
        this.editProductione.meterPr = meterpr;
        this.editProductione.tarikh = tarikh;
        this.editProductione.descreption = descreption;

        this.textileService.saveProduction(this.editProductione).subscribe(
            value => {
                console.log('[POST] create Customer successfully');
            }, error => {
                console.log('FAIL to create Production!');
            },
            () => {
                this.textileService.getAllProduction().subscribe(
                    (data) => {
                        this.getall(data);
                    }
                );
            });

    }

    clear() {
        this.production.id = null;
        this.production.prid = null;
        this.production.prName = null;
        this.production.meterPr = null;
        this.production.tarikh = null;
        this.production.descreption = null;
    }


    searchResult(event) {
        this.textileService.SearchProduction(event.target.value).subscribe(
            value => {
                this.prSearched = value;

            },
            error1 => {
                console.log('fail...');
            },
            () => {
                console.log('complete');
            }
        );
    }
}
