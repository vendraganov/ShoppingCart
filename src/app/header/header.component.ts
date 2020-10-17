import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {FirebaseService} from "../services/firebase.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated: boolean = false;
  private userSubscription: Subscription;

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user=>{
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      }
    );
  }

  onSaveRecipe() {
    this.firebaseService.saveRecipes();
  }

  onGetRecipe() {
    this.firebaseService.getRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
