import { Routes } from '@angular/router';
import { DashBoardComponent } from './page/dash-board/dash-board.component';
import { IncomeComponent } from './page/income/income.component';
import { GoalsComponent } from './page/goals/goals.component';
import { AchievementsComponent } from './page/achievements/achievements.component';
import { NotesComponent } from './page/notes/notes.component';
import { ReportsComponent } from './page/reports/reports.component';

export const routes: Routes = [
    { 
        path: '',
        redirectTo: 'dash-board', 
        pathMatch: 'full' 
    },// Redirect root to dashboard
    {
        path:"dash-board",
        component:DashBoardComponent
    },
    {
        path:"income",
        component:IncomeComponent
    },
    {
        path:"goals",
        component:GoalsComponent
    },
    {
        path:"achievements",
        component:AchievementsComponent
    },
    {
        path:"notes",
        component:NotesComponent
    },
    {
        path:"reports",
        component:ReportsComponent
    },
    { path: '**', 
      redirectTo: 'dash-board'
    } // Redirect unknown paths to dashboard
];
