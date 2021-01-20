import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
})
export class RoutesPage implements OnInit {


  routes = [
    {
      id: "1",
      title: "Statue of Liberty",
      imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/1200px-Statue_of_Liberty_7.jpg",
      comments: ["Awesome place", "Wonderful experience"]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
