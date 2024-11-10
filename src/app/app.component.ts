import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./common/header/header.component";
import { DashBoardComponent } from "./page/dash-board/dash-board.component";
import { IncomeComponent } from "./page/income/income.component";
import { GoalsComponent } from "./page/goals/goals.component";
import { AchievementsComponent } from './page/achievements/achievements.component';
import { NotesComponent } from './page/notes/notes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DashBoardComponent, IncomeComponent, GoalsComponent,AchievementsComponent,NotesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Finace_Management_System';
}
