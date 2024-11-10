import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent {

  public income:any={
    description:"",
    income:"",
    date:"",
    savingRate:"",
    saving:"",
    balance:""
  };
  
  calculateSavingAndBalance() {

    const incomeValue = Number(this.income.income);
    const savingRateValue = Number(this.income.savingRate);

    // Calculate Saving 
    if (incomeValue && savingRateValue) {
      this.income.saving = (incomeValue  * savingRateValue) / 100;
    } else {
      this.income.saving = 0; 
    }
     // Calculate balance
     this.income.balance = incomeValue - this.income.saving;

  }

  calculateUpdateSavingAndBalance(){
    //  CalculateUpdate Saving
    const incomeValueTemp = Number(this.incomeTemp.income);
    const savingRateValueTemp = Number(this.incomeTemp.savingRate);

    if (incomeValueTemp && savingRateValueTemp) {
      this.incomeTemp.saving = (incomeValueTemp * savingRateValueTemp) / 100;
    } else {
      this.incomeTemp.saving = 0; 
    }
    // Calculate balance
    this.incomeTemp.balance = incomeValueTemp  - this.incomeTemp.saving;
  }

  
  public incomeList:any=[];
  constructor(private http:HttpClient){
    this.loadTable();
  }
  loadTable(){
    this.http.get("http://localhost:8080/income/get-income").subscribe(data=>{
      this.incomeList =data;
    })
  }
  public addIncome(){
    this.http.post("http://localhost:8080/income/add-income",this.income).subscribe((data)=>{
      alert("Income Added !!!");
    })
  }
  deleteIncomeById(id:any){
    console.log(id);
    this.http.delete(`http://localhost:8080/income/delete-income/${id}`).subscribe(data=>{
    alert("Income Delete !");
    this.loadTable();
    })
  }

  public incomeTemp:any={}
   updateIncome(income:any){
    console.log(income);
    this.incomeTemp=income;
   }
  saveIncome(){
    this.http.put("http://localhost:8080/income/update-income",this.incomeTemp).subscribe(data=>{
      alert("Income Update !")
    })
  }
}
