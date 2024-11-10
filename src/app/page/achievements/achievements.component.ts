import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css'
})
export class AchievementsComponent {


  public goal:any={
    goal:"",
    start_date:"",
    expect_Date:"",
    status:""
  };
  public achievement:any={
    goal_id:"",
    name:"",
    status:"Success"
  }

  public goalList:any=[];
  public achievedGoals: any[] = [];
  constructor(private http:HttpClient){
    this.loadTable();
  }

  loadTable(){
    this.http.get("http://localhost:8080/goal/get-goal").subscribe(data=>{
      console.log(data);
      this.goalList= data;
    })
  }

  updateGoalStatus(goal:any ,status: string){
    if (status === 'Achieve') {
      
      if (!this.achievedGoals.includes(goal)) {
        this.achievedGoals.push(goal);
        this.achievement.goal_id=goal.id;
        this.achievement.name=goal.goal;
        this.addAchievement();
      }
    } else {
     
      this.achievedGoals = this.achievedGoals.filter(g => g !== goal);
    }

  }

  public addAchievement(){
    this.http.post("http://localhost:8080/achievement/add-achievement",this.achievement).subscribe((data)=>{
      alert("Achievement Added !!!");
    })
  }
}
