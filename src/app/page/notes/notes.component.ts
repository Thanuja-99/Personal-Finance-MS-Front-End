import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  
  public note:any={
    date:"",
    note:""
  };
  public noteList:any=[];
  constructor(private http:HttpClient){
    this.loadTable();
  }
  public addNote(){
    this.http.post("http://localhost:8080/note/add-note",this.note).subscribe((data)=>{
      alert("Note Added !!!");
      this.loadTable();
      this.clearcard();
      
    })
  }

  loadTable(){
    this.http.get("http://localhost:8080/note/get-note").subscribe(data=>{
      console.log(data);
      this.noteList= data;
    })
  }
  deleteNotesById(id:any){
    console.log(id);
    this.http.delete(`http://localhost:8080/note/delete-note/${id}`).subscribe(data=>{
    alert("Note Delete !");
    this.loadTable();
    })
  }

  public noteTemp:any={}
   updateNote(note:any){
    console.log(note);
    this.noteTemp=note;
   }
  saveNote(){
    this.http.put("http://localhost:8080/note/update-note",this.noteTemp).subscribe(data=>{
      alert("Note Update !")
    })
  }

  clearcard(){
    this.note.date="";
    this.note.note="";
  }
  
}
