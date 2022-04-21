import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Employee } from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL_API = 'http://localhost:4000/api/emps'

  selectedEmp: Employee = {
    name: '',
    office: '',
    position: '',
    salary: 0
  };

  employees : Employee[];

  constructor(private http: HttpClient) { }

  getEmp(){
    //console.log("acabe de llamar el empleado")
    return this.http.get<Employee[]>(this.URL_API);
  }

  createEmp(employee: Employee){
    return this.http.post(this.URL_API, employee)
  }

  delete(id){
    return this.http.delete(this.URL_API+'/'+id)
  }
}
