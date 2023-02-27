import { curTasksToday } from "../Model/main/TaskModel";
import DashboardMenuView from "../View/menus/DashboardView";
import TasksComponentController from "./TasksComponentController";
import HabitsComponentController from "./Habits/HabitsComponentController";

class DashboardMenuController {
  constructor() {
    this.view = new DashboardMenuView();
  }

  initTasks(){
    const {dashboardTasks} = this.view.getElems()
    const dashboardTasksComponentController = new TasksComponentController(curTasksToday, "dashboard", "today")
    dashboardTasksComponentController.init(dashboardTasks)
  }

  initHabits(){
      const {dashboardHabits} = this.view.getElems()  
      const habitsComponentController = new HabitsComponentController()    
      habitsComponentController.init(dashboardHabits)                  
  }

  initYIP(){
    const {dashboardYIP} = this.view.getElems()
    // const yipComponentController = new YIPComponentController()
  }

  init() {
    this.view.render();
    this.initTasks()
    this.initHabits()
  }
}

export const dashboardMenuController = new DashboardMenuController();
