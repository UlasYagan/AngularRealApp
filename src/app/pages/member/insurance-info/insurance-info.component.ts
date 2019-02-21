import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'insurance-info',
  templateUrl: './insurance-info.component.html',
  styleUrls: ['./insurance-info.component.css']
})
export class InsuranceInfoComponent implements OnInit {
  @Input() memberId;
  constructor() { }

  ngOnInit() {
  }

}
