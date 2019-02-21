import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {

  constructor(private toolsService: ToolsService) { }

  ngOnInit() {
  }

}
