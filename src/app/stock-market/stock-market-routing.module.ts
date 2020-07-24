import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockDataComponent } from './components/stock-data/stock-data.component';
import { CompanyComponent } from './components/company/company.component';
import { StockPriceComponent } from './components/stock-price/stock-price.component';
import { StockIndicesComponent } from './components/stock-indices/stock-indices.component';
import { ComparisionsComponent } from './components/comparisions/comparisions.component';
import { ExcelUploaderComponent } from './components/excel-uploader/excel-uploader.component';


const routes: Routes = [
  {
    path: "stock-data", component: StockDataComponent,
    children: [
      { path: "company", component: CompanyComponent },
      { path: "company/:id", component: CompanyComponent },
      { path: "excel-upload", component: ExcelUploaderComponent },
      { path: "stock-price", component: StockPriceComponent },
      { path: "stock-indices", component: StockIndicesComponent },
      { path: "comparisions", component: ComparisionsComponent },
      { path: "**", redirectTo: "company", pathMatch: "full" }
    ]
  },
  { path: "**", redirectTo: "stock-data", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockMarketRoutingModule { }
