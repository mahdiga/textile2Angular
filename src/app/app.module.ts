import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ProductionComponent} from './production/production.component';
import {CustomerComponent} from './customer/customer.component';
import {ManagementSaleComponent} from './management-sale/management-sale.component';
import {ReportComponent} from './report/report.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {TextileService} from './services/textile.service';
import {HttpClientModule} from '@angular/common/http';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {ManagementsaleService} from './services/managementsale.service';
import {FocusDirective} from './focus.directive';
import {AdminComponent} from './admin/admin.component';
import {SignUpComponent} from './admin/sign-up/sign-up.component';
import {SignInComponent} from './admin/sign-in/sign-in.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {UserService} from './services/user.service';
import {AuthGaurd} from './services/auth/auth-guard.service';
import {AuthService} from './services/auth/auth.service';
import {AuthPageComponent} from './auth-page/auth-page.component';


const routes: Routes = [
    {path: '', canActivate: [AuthGaurd], component: ManagementSaleComponent},
    {path: 'production', canActivate: [AuthGaurd], component: ProductionComponent},
    {path: 'customer', canActivate: [AuthGaurd], component: CustomerComponent},
    {path: 'report', canActivate: [AuthGaurd], component: ReportComponent},
    {
        path: 'admin', canActivateChild: [AuthGaurd], component: AdminComponent, children: [
            {path: 'signIn', component: SignInComponent},
            {path: 'dashboard', component: DashboardComponent}
        ]
    },
    {path: 'signUp', component: SignUpComponent},
    {path: 'auth', component: AuthPageComponent}
];


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ProductionComponent,
        CustomerComponent,
        ManagementSaleComponent,
        ReportComponent,
        AdminComponent,
        SignUpComponent,
        SignInComponent,
        DashboardComponent,
        AuthPageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        DpDatePickerModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule
    ],
    providers: [TextileService, ManagementsaleService, Title, UserService, AuthGaurd, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
