import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent {
  public goal:any={
    goal:"",
    start_date:"",
    expect_Date:"",
    status: ""
  };
  public goalList:any=[];
  constructor(private http:HttpClient){
    this.loadTable();
  }
  public addGoal(){
    this.http.post("http://localhost:8080/goal/add-goal",this.goal).subscribe((data)=>{
      alert("Goal Added !!!");
    })
  }

  loadTable(){
    this.http.get("http://localhost:8080/goal/get-goal").subscribe(data=>{
      console.log(data);
      this.goalList= data;
    })
  }
  deleteGoalsById(id:any){
    console.log(id);
    this.http.delete(`http://localhost:8080/goal/delete-goal/${id}`).subscribe(data=>{
    alert("Goal Delete !");
    this.loadTable();
    })
  }

  public goalTemp:any={}
   updategoal(goal:any){
    console.log(goal);
    this.goalTemp=goal;
   }
  saveGoal(){
    this.http.put("http://localhost:8080/goal/update-goal",this.goalTemp).subscribe(data=>{
      alert("Goal Update !")
    })
  }
}
