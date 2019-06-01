import { Injectable } from '@angular/core';
import { Person } from "../models/person";


@Injectable()
export class PersonFeederProvider {
  private localPersons: Person[] = [];

  constructor() {
    this.mockPersons();
  }

  provide(): Person {
    return this.localPersons.shift()
  }

  mockPersons() {
    let person1 = new Person();
    person1.name = 'Magdalena';
    person1.age = 23;
    person1.pictureUrls = ['https://images.unsplash.com/photo-1511654433543-916c15d46ad6?ixlib=rb-1.2.1&w=1000&q=80'];
    person1.averageVote = Math.random() * 10;
    person1.voteCount = 231;

    let person2 = new Person();
    person2.name = 'Kasia';
    person2.age = 21;
    person2.pictureUrls = ['https://images.pexels.com/photos/247878/pexels-photo-247878.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'];
    person2.averageVote = Math.random() * 10;
    person2.voteCount = 212;

    let person3 = new Person();
    person3.name = 'Wiktoria';
    person3.age = 23;
    person3.pictureUrls = ['https://i1.wp.com/tricksmaze.com/wp-content/uploads/2017/10/Stylish-Girls-Profile-Pictures-11.jpg?resize=466%2C466&ssl=1'];
    person3.averageVote = Math.random() * 10;
    person3.voteCount = 231;

    let person4 = new Person();
    person4.name = 'Wiktoria';
    person4.age = 23;
    person4.pictureUrls = ['https://assets.capitalfm.com/2018/23/lilliya-scarlett-instagram-1528814125-custom-0.png'];
    person4.averageVote = Math.random() * 10;
    person4.voteCount = 231;

    let person5 = new Person();
    person5.name = 'Wiktoria';
    person5.age = 23;
    person5.pictureUrls = ['https://www.decentfashion.in/wp-content/uploads/2018/10/girl-whatsapp-dp-images-14.jpg'];
    person5.averageVote = Math.random() * 10;
    person5.voteCount = 231;

    let person6 = new Person();
    person6.name = 'Wiktoria';
    person6.age = 23;
    person6.pictureUrls = ['https://i.pinimg.com/originals/f2/51/c1/f251c14e4319222dd53eacdf73e09199.jpg'];
    person6.averageVote = Math.random() * 10;
    person6.voteCount = 231;

    this.localPersons.push(person1);
    this.localPersons.push(person2);
    this.localPersons.push(person3);
    this.localPersons.push(person4);
    this.localPersons.push(person5);
    this.localPersons.push(person6);
  }

}
