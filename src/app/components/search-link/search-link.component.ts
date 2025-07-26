import { Component, inject, signal, ChangeDetectionStrategy, effect } from "@angular/core";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { compareLinkStore } from "../../stores/compare-link/compare-link.store";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
    selector: 'app-search-link',
    templateUrl: './search-link.component.html',
    styleUrls: ['./search-link.component.scss'],
    imports: [ReactiveFormsModule, NgxSpinnerModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLinkComponent {
    clStore = inject(compareLinkStore);
    spinner = inject(NgxSpinnerService);

    linkControl = new FormControl('');

    constructor() {
        effect(() => {
            if (this.clStore.isLoading()) {
                this.spinner.show();
            } else {
                this.spinner.hide();
            }
        })
    }

    onSubmit(e: Event) {
        e.preventDefault();
 
        this.clStore.compareLink(this.linkControl.value || '');
    }
}