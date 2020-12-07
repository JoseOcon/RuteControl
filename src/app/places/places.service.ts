import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private places: Place[] = [
    {
    id: "1",
    title: "Eiffel Tower",
    imgURL: "https://lh3.googleusercontent.com/4M4aeaq4LQwNoL7BkfnGD_BDQCUuVA2JWYXqEtuRbTnMK1kVgJcbE1KcPjHo-fDPHg",
    comments: ["Awesome place", "Wonderful experience"]
    },
    {
      id: "2",
      title: "Statue of Liberty",
      imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/1200px-Statue_of_Liberty_7.jpg",
      comments: ["Awesome place", "Wonderful experience"]
    },
    {
      id: "3",
      title: "Awesome Place",
      imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/1200px-Statue_of_Liberty_7.jpg",
      comments: []
    },
  ]

  constructor() { }

  getPlaces(){
    return [... this.places]
  }

  getPlace(placeId: string){
    return {...  this.places.find(place => {
        return place.id === placeId
      })
    }
  }

  addPlace(title: string, imgURL: string){
    this.places.push({
      title,
      imgURL,
      comments: [],
      id: this.places.length + 1 + ""
    });
  }

  deletePlace(placeId: string){
    this.places = this.places.filter(place => {
      return place.id !== placeId
    })
  }

}
