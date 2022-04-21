import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../services/employee.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(public empService: EmployeeService) { }

  ngOnInit() {
    console.log('Server on port',3000)
      this.getEmps();
    }

    getEmps(){
        this.empService.getEmp().subscribe(
        res => {
          this.empService.employees = res;
        },
        err => console.log(err)
    )
    }

    addEmp(form: NgForm){
      console.log("creando empleado")
      this.empService.createEmp(form.value).subscribe(
        res=> {
          //console.log(res)
          
        },
        err => console.log(err)
      )
      setTimeout(() => {
        this.getEmps();
        form.reset();
      }, 500);
          
    }

    delete(id){
      console.log('el id es',id)
      const res = confirm("are you sure you want to delete?")
      if(res){
         this.empService.delete(id).subscribe(
           res => console.log(res),
           err => console.log(err)
         )
        setTimeout(() => {
          this.getEmps();
        }, 500);
         
      }
    }

    edit(employee){
      this.empService.selectedEmp = employee
      console.log(employee)
    }

    resetform(form: NgForm){
      form.reset();
    }

}
