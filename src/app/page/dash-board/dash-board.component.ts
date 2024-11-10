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
    shopping: 0,
    food: 0,
    bill: 0,
    travel: 0,
    medicine: 0,
    donation: 0,
  };

  public value: any = {
    purpose: "",
    category: "",
    date: "",
    cost: ""
  };

  public incomeList: any = [];
  public valueList: any = [];
  public dashboardList: any = [];

  constructor(private http: HttpClient) {
    this.loadTable();
    this.loadTableDashBoard();
    this.loadTableDashBoardCategory();
  };

  loadTable() {
    this.http.get("http://localhost:8080/income/get-income").subscribe(data => {
      this.incomeList = data;
      this.calculateIncome();
      this.calculateSaving();
    })
  }

  loadTableDashBoard() {
    this.http.get("http://localhost:8080/dashboard/get-dashboard").subscribe(data => {
      this.valueList = data;
    })
  }

 
  loadTableDashBoardCategory() {
    this.http.get("http://localhost:8080/dashboardcategory/get-dashboardcategory").subscribe(data => {
      this.dashboardList = data;
    })
  }

  addDashBoard() {
    this.http.post("http://localhost:8080/dashboard/add-dashboard", this.value).subscribe((data) => {
      alert("Value Added !!!");
      this.dashboard.totalBalance -= this.value.cost;
      const costValue = Number(this.value.cost);

      // Dynamically update the correct category
      if (this.value.category && this.dashboard.hasOwnProperty(this.value.category)) {
        this.dashboard[this.value.category] += costValue;
      }
      this.loadTableDashBoard();
      this.clearCard();
      this.loadTableDashBoardCategory();

      this.http.post("http://localhost:8080/dashboardcategory/add-dashboardcategory", this.dashboard).subscribe(data => {
        alert("Income Update !");
      });


      // if(this.value.category =='shopping'){
      //   this.dashboard.shopping += costValue; 

      // }else if(this.value.category =='food'){
      //   this.dashboard.food +=  costValue;

      // }else if(this.value.category =='bill'){
      //   this.dashboard.bill +=  costValue;

      // }else if(this.value.category =='travel'){
      //   this.dashboard.travel +=  costValue;

      // }else if(this.value.category =='medicine'){
      //   this.dashboard.medicine +=  costValue;

      // }else if(this.value.category =='donation'){
      //   this.dashboard.donation +=  costValue;
      // }
    })
  }

  // balance card value  calculate pass form income
  calculateIncome() {
    this.dashboard.totalBalance = 0;
    for (let income of this.incomeList) {
      this.dashboard.totalBalance += Number(income.balance) || 0;
    }
  }
  // saving  card value  calculate pass form income
  calculateSaving() {
    this.dashboard.totalSaving = 0;
    for (let income of this.incomeList) {
      this.dashboard.totalSaving += Number(income.saving) || 0;
    }
  }
  // check select category
  selectCheckCategory(dashboard: any, status: String) {
    this.value.category = status;

    // if (status === 'shopping') {
    //   this.value.category = 'shopping';

    // } else if (status === 'food') {
    //   this.value.category = 'food';

    // } else if (status === 'bill') {
    //   this.value.category = 'bill';

    // } else if (status === 'travel') {
    //   this.value.category = 'travel';

    // } else if (status === 'medicine') {
    //   this.value.category = 'medicine';

    // } else if (status === 'donation') {
    //   this.value.category = 'donation';

    // }
  }

  clearCard() {
    this.value.purpose = "";
    this.value.cost = "";
    this.value.date = "";
  }

}


