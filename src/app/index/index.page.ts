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
  //  console.log('Server on port',4000)
    this.main();  
    //this.getEmps();
    }

 main(){
   console.log("HAciendo la equis")
      var row, column, norows =5;
      for( row=0; row<norows; row++ ){ 
          for( column=0; column<norows; column++ ){
            if( (row == column) || (( row+column)==(norows-1)))
               console.log("X");                             
             else
               console.log(" ");
          }
          console.log("\n");
      }
      return 0;
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
