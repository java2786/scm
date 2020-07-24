import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../../models/company.model';
import { StockExchange } from '../../models/stock-exchange.model';
import { Sector } from '../../models/sector.model';
import { StockExchangeService } from '../../services/stock-exchange.service';
import { CompanyService } from '../../services/company.service';
import { SectorService } from '../../services/sector.service';
import { LoadingService } from 'src/app/services/loading.service';
// import { Company } from 'src/app/models/company.model';
// import { CompanyService } from 'src/app/services/company.service';
// import { Router } from '@angular/router';
// import { AppUiService } from 'src/app/services/app-ui-service';
// import { StockExchange } from 'src/app/models/stock-exchange.model';
// import { Sector } from 'src/app/models/sector.model';
// import { StockExchangeService } from 'src/app/services/stock-exchange.service';
// import { SectorService } from 'src/app/services/sector.service';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
  } from "@angular/forms";
  // import { Observable } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  id: number;
  private sub: any;

  company: Company = {
    id: 0,
    companyName: "",
    turnover: 0,
    ceo: "",
    boardDirectors: "",
    stockExchange: "",
    sectorCode: "",
    brief: "",
    stockCode: ""

};
  stockExchanges: StockExchange[] = [];
  sectors: Sector[] = [];
  companies: Company[] = [];

  companyForm: FormGroup;

  constructor(
    private exchangeService: StockExchangeService,
    private sectorService: SectorService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {

      this.createCompanyForm();

      
    }

    createCompanyForm(){
      this.companyForm = this.formBuilder.group({
        'id': [this.company.id],
        'companyName': [this.company.companyName, [Validators.required]],
        'turnover': [this.company.turnover, [Validators.required]],
        'ceo': [this.company.ceo, [Validators.required]],
        'boardDirectors': [this.company.boardDirectors, [Validators.required]],
        'brief': [this.company.brief, [Validators.required]],
        'sectorCode': [this.company.sectorCode, [Validators.required]],
        'stockExchange': [this.company.stockExchange, [Validators.required]],
      })
    }

    onAdd(control) {
      (<FormArray>this.companyForm.controls[control]).push(new FormControl('', Validators.required));
    }
  
    ngOnInit() {

      this.sub = this.route.params.subscribe(params => {
        this.id = isNaN(params['id'])? -1 : +params['id'];
     });

      this.exchangeService.getAllStockExchanges().subscribe(
        data => {
          console.log("ex->", data);
          this.stockExchanges = data;
        }
      );
  
      this.sectorService.getAllSectors().subscribe(
        data => {
          console.log("sectors->", data);
          this.sectors = data;
        }
      );
  
      this.findAllCompanies();
  
    }

    findAllCompanies(){
      this.companyService.getAllCompanies().subscribe(
        data => {
          this.companies = data;
          console.log("comapnies->", this.companies);
        }
      );
    }

    submitForm(){
      console.log(this.company.id);

      if(this.company.id > 0){
        this.updateCompany();
      } else {
        this.addCompany();
      }
    }

    updateCompany(): void {
      console.log(this.companyForm.value);


      this.companyService.updateCompany(this.companyForm.value, this.company.id)
      .subscribe(res => {
          console.log(res);
          this.companyForm.reset();
          this.findAllCompanies();

          // this.router.navigate(["/stock-market/stock-data/company"]);
        }, err=>{
          console.log(err);
        }
      );
    }


    addCompany(): void {
      console.log(this.companyForm.value);


      this.companyService.addCompany(this.companyForm.value)
      .subscribe(res => {
          console.log(res);
          this.companyForm.reset();
          this.findAllCompanies();

        }, err=>{
          console.log(err);
        }
      );
    }


    editButtonClicked(company:Company){
      // need to complete
      console.log(company);
      this.company = company;
      this.createCompanyForm();

    }
}
