import { Component } from '@angular/core';
import { CommonService } from './common.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'my-test-app';

    constructor(private commonService: CommonService) { }

    onSave() {
        this.commonService.saveUser({ name: 'user1', address: 'address1' }).subscribe(x => {
            console.log("User saved");
            console.log(x);
        });
    }
}
