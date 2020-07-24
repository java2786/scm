import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { StockPriceService } from '../../services/stock-price.service';

@Component({
  selector: 'app-excel-uploader',
  templateUrl: './excel-uploader.component.html',
  styleUrls: ['./excel-uploader.component.scss']
})
export class ExcelUploaderComponent implements OnInit {

  storeData: any;
  fileUploaded: File;

  first_worksheet: any;


  constructor(private companyService: CompanyService, private stockPriceService: StockPriceService) { }
  ngOnInit() { }



  uploadedFile(event) {
    console.log('call')
    this.fileUploaded = event.target.files[0];
    this.readExcel();
  }

  readExcel() {
    let readFile = new FileReader();
    readFile.onload = (e) => {
      console.log('onload');
      this.storeData = readFile.result;
      var data = new Uint8Array(this.storeData);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      this.first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    }
    readFile.readAsArrayBuffer(this.fileUploaded);
  }

  readFirstSheet(dataType) {
    this.readAsJson(this.first_worksheet, (jsonData: Company[]) => {
      console.log(jsonData);
      // post data

      jsonData.map((data:any)=>{

        (function(delay) {
          var start = new Date().getTime();
          while (new Date().getTime() < start + delay);
      })(500)  

        let service = null;
        if(dataType == 'company'){
          service = this.companyService.addCompanies(data);
        } else if(dataType == 'stock'){
          service = this.stockPriceService.addStockPrices(data);
        }
  
        service.subscribe((res:any)=>{
          console.log(res);
        }, err=>{
          console.log(err);
        })
      })

    });
  }

  readAsJson(worksheet, cb) {
    var jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
    cb(jsonData);
  }


  
}
