import { NgModule } from '@angular/core';
import { VoteSliderComponent } from "./vote-slider/vote-slider";
import { PersonCardComponent } from './person-card/person-card';
@NgModule({
	declarations: [VoteSliderComponent,
    PersonCardComponent],
	imports: [],
	exports: [VoteSliderComponent,
    PersonCardComponent]
})
export class ComponentsModule {}
