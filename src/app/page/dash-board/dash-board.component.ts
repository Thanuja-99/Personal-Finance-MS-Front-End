import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {
  public income: any = {
    saving: "",
    balance: ""
  };
  public dashboard: any = {
    totalBalance: "",
    totalSaving: "",
    shopping:"",
    food:"",
    bill:"",
    travel:"",
    medicine:"",
    donation:"",
  };

  public value: any={
    purpose:"",
    category:"",
    date:"",
    cost:""
  };

  public incomeList: any = [];
  public dashboardList:any=[];

  constructor(private http: HttpClient) {
    this.loadTable();
    this.loadTableDashBoard();
  };

  loadTable() {
    this.http.get("http://localhost:8080/income/get-income").subscribe(data => {
      this.incomeList = data;
      this.calculateIncome();
      this.calculateSaving();
    })
  }
 
  loadTableDashBoard(){
    this.http.get("http://localhost:8080/dashboard/get-dashboard").subscribe(data=>{
      this.incomeList =data;
    })
  }

  addDashBoard(){
    this.http.post("http://localhost:8080/dashboard/add-dashboard",this.value).subscribe((data)=>{
      alert("Value Added !!!");
    })
  }


  calculateIncome() {
    this.dashboard.totalBalance = 0;
    for (let income of this.incomeList) {
      this.dashboard.totalBalance += Number(income.balance) || 0;
    }
  }

  calculateSaving(){
  this.dashboard.totalSaving = 0;
  for (let income of this.incomeList) {
    this.dashboard.totalSaving += Number(income.saving) || 0;
  }
}
}

