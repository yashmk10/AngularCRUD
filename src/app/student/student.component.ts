import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  formValue!: FormGroup;
  studentModelObject: StudentModel = new StudentModel;
  studentData!: any;
  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id: 0,
      name:[''],
      email:[''],
      mobile:[''],
      gender:[''],
    })
    this.getAllStudents()
  }
postStudentDetails(){
  this.studentModelObject.name = this.formValue.value.name;
  this.studentModelObject.email = this.formValue.value.email;
  this.studentModelObject.mobile = this.formValue.value.mobile;
  this.studentModelObject.gender = this.formValue.value.gender;

  this.api.postStudents(this.studentModelObject).subscribe(res=>{
    console.log(res);
    alert("Student Record Added Successfully!");
    let ref = document.getElementById('cancel');
    ref?.click();
    this.formValue.reset();
    this.getAllStudents();
  },
  err=>{
    alert("Something went wrong, please check again!");
  })
}

getAllStudents(){
  this.api.getStudents().subscribe(res=>{
    this.studentData = res;
  })
}
deleteStudents(stu:any){
  this.api.deleteStudent(stu.id).subscribe(res=>{
    alert("Student Record Deleted Successfully!")
    this.getAllStudents()
  })
}

onEdit(stu:any){
  this.studentModelObject.id = stu.id;
  this.formValue.controls['name'].setValue(stu.name);
  this.formValue.controls['email'].setValue(stu.email);
  this.formValue.controls['mobile'].setValue(stu.mobile);
  this.formValue.controls['gender'].setValue(stu.gender);
}

updateStudentDetails(){
  this.studentModelObject.name = this.formValue.value.name;
  this.studentModelObject.email = this.formValue.value.email;
  this.studentModelObject.mobile = this.formValue.value.mobile;
  this.studentModelObject.gender = this.formValue.value.gender;

  this.api.updateStudent(this.studentModelObject, this.studentModelObject.id).subscribe(res=>{
    alert("Student Record Updated!");
    let ref = document.getElementById('cancel');
    ref?.click();
    this.formValue.reset();
    this.getAllStudents();
  })
}
}
