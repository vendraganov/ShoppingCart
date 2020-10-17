import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {AuthModel} from "./auth.model";
import {Observable, Subscription} from "rxjs";
import {AuthResponseModel} from "./auth.response.model";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/custom-dialogs/alert/alert.component";
import {PlaceholderDirective} from "../shared/directives/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  authObservable: Observable<AuthResponseModel>;

  @ViewChild(PlaceholderDirective)
  alertHost: PlaceholderDirective;

  private alertSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.alertSubscription){
      this.alertSubscription.unsubscribe();
    }
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
     if(!form.valid){
       return;
     }

    this.isLoading = true;
    const authModel = new AuthModel(form.value.email, form.value.password, true);
     if(this.isLoginMode){
      this.authObservable = this.authService.signIn(authModel);
     }
     else {
      this.authObservable = this.authService.signUp(authModel);
     }
     console.log(this.authObservable);
     this.authObservable.subscribe(authResponse=>{
       console.log(authResponse);
       this.isLoading = false;
       this.router.navigate(['/recipes']);
     },errorMessage => {
       console.log(errorMessage);
       this.error = errorMessage;
       this.showErrorAlert(errorMessage);
       this.isLoading = false;
     });

     form.reset();
  }

  handleError() {
    this.error = null;
  }

  private showErrorAlert(message: string){
    // we use the factory to get the alertComponent
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    // clear all old render components
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    // on close we can subscribe to event emitter and clear the view and unsubscribe
    // we can use Subject for this but we use the emit field of the object AlertComponent
    this.alertSubscription = componentRef.instance.close.subscribe(()=>{
      this.alertSubscription.unsubscribe();
      hostViewContainerRef.clear();
    })

  }
}
