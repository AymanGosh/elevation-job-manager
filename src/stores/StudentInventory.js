import { observable, action, makeObservable, computed } from "mobx";

import axios from "axios";

export class StudentInventory {
  constructor() {
    this.StudentJobs = [];
    this.name = '';
    this.isLoggedIn = false;
    makeObservable(this, {
      name: observable,
      StudentJobs: observable,
      isLoggedIn: observable,
      numItems: computed,
      checkUserLoggedIn: action,
      setLogin: action,
      logout: action,
      addJobsFromDB: action,
    });
    this.addJobsFromDB();
  }
  get numItems() {
    return this.StudentJobs.length;
  }
  addJobsFromDB = async () => {
    try{
    let majd = "61f6a857da58142f79a54b12";
    let result = await axios.get(`http://localhost:8888/student/jobs/${majd}`);
    this.StudentJobs = result.data;
    }catch(error){
      console.log("Something wrong") 
    }
  };

  setLogin = () => {
    this.isLoggedIn = true;
  }

  checkUserLoggedIn = async () => {
    const response = await fetch('http://localhost:8888/auth/user', {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });

    const content = await response.json();
    this.name = content.name;
  }

  logout = async () => {
    await fetch('http://localhost:8888/auth/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });

    this.name = '';
    this.isLoggedIn = false;
  }

  edditStatusForStudent = async (jobId, status) => {
    const res = await axios.post(
      "http://localhost:8888/student/jobs/status/" + jobId + "/interviews",
      { status }
    );
    this.addJobsFromDB();
  };
}