import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PathFindingVisualizerComponent } from './path-finding-visualizer/path-finding-visualizer.component';
import { CellComponent } from './path-finding-visualizer/cell/cell.component';
import { HeaderComponent } from './layout/header/header.component';
import { RightSidebarComponent } from './layout/right-sidebar/right-sidebar.component';
import { StoreModule } from '@ngrx/store';
import { excutionButtonReducer, speedButtonReducer, configButtonReducer, SetDownPointReducer } from './core/store/buttonStore/button.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { LoadingComponent } from './layout/loading/loading.component';
import { AcheronTooltipDirective } from './layout/directives/acheron-tooltip.directive';
import { CustomTooltipComponent } from './layout/custom-tooltip/custom-tooltip.component';
import { NotifierModule } from 'angular-notifier';
import { ThreeComponent } from './three/three.component';
@NgModule({
    declarations: [
        AppComponent,
        PathFindingVisualizerComponent,
        CellComponent,
        HeaderComponent,
        RightSidebarComponent,
        LoadingComponent,
        AcheronTooltipDirective,
        CustomTooltipComponent,
        ThreeComponent
    ],
    imports: [
        BrowserModule,
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        StoreModule.forRoot({
            button: excutionButtonReducer,
            buttonSpeed: speedButtonReducer,
            buttonConfig: configButtonReducer,
            point: SetDownPointReducer
        }),
        NotifierModule.withConfig(
            {
                position: {
                    horizontal: {
                        position: 'right', // 'left' | 'center' | 'right'
                        distance: 12 // Số pixel từ mép trái hoặc mép phải tùy thuộc vào giá trị 'position'
                    },
                    vertical: {
                        position: 'top', // 'bottom' | 'middle' | 'top'
                        distance: 12 // Số pixel từ mép dưới hoặc mép trên tùy thuộc vào giá trị 'position'
                    }
                },
                animations: {
                    enabled: true, // Có bật hiệu ứng không
                    show: {
                        easing: 'ease', // Hiệu ứng hiển thị (easing)
                        speed: 300 // Thời gian hiển thị (milliseconds)
                    },
                    hide: {
                        easing: 'ease', // Hiệu ứng ẩn đi (easing)
                        speed: 100 // Thời gian ẩn đi (milliseconds)
                    },
                    shift: {
                        speed: 10, // Thời gian di chuyển (milliseconds)
                        easing: 'ease' // Hiệu ứng di chuyển (easing)
                    },
                    overlap: 1 // Khoảng thời gian giữa các thông báo (milliseconds)
                },
            }
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
