import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  imports: [],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.less',
})

export class ProjectDetailComponent implements OnInit {
  url!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => (this.url = params.get('id')!));
    console.log('ID>>>>>>>>>>', this.url)
  }
}
