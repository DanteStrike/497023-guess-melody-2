import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {App} from "./app.jsx";

Enzyme.configure({adapter: new Adapter()});

HTMLAudioElement.prototype.pause = () => { /* do nothing */ };

describe(`APP screens should switch`, () => {

  it(`On start game button click: welcome screen should switch to first question`, () => {
    const questionsMock = [
      {
        id: 1,
        type: `genre`,
        genre: `jazz`,
        answers: [
          {
            src: ``,
            genre: `jazz`
          },
        ]
      },
    ];

    const AppComponent = mount(
        <App
          gameTime={1}
          maxMistakes={1}
          questions={questionsMock}
          step={-1}
          mistakes={0}
          onUserAnswerClick={jest.fn}
          onWelcomeScreenClick={jest.fn}
        />
    );

    const startGameButton = AppComponent.find(`.welcome__button`);
    expect(startGameButton.exists()).toEqual(true);
    startGameButton.simulate(`click`);
    AppComponent.setProps({step: 0});

    const questionGenreScreen = AppComponent.find(`.game--genre`);
    expect(questionGenreScreen.exists()).toEqual(true);
  });

  it(`Should switch questions screens`, () => {
    const questionsMock = [
      {
        id: 1,
        type: `genre`,
        genre: `jazz`,
        answers: [
          {
            src: ``,
            genre: `jazz`
          },
        ]
      },
      {
        id: 2,
        type: `artist`,
        song: {
          artist: `Plаcido Domingo`,
          src: ``
        },
        answers: [
          {
            artist: `Plаcido Domingo`,
            image: ``
          }
        ]
      }
    ];

    const AppComponent = mount(
        <App
          gameTime={1}
          maxMistakes={1}
          questions={questionsMock}
          step={0}
          mistakes={0}
          onUserAnswerClick={jest.fn}
          onWelcomeScreenClick={jest.fn}
        />
    );

    const genreScreenForm = AppComponent.find(`.game__tracks`);
    expect(genreScreenForm.exists()).toEqual(true);
    genreScreenForm.simulate(`submit`, {
      preventDefault: ()=>{}
    });
    AppComponent.setProps({step: 1});

    const questionArtistScreen = AppComponent.find(`.game--artist`);
    expect(questionArtistScreen.exists()).toEqual(true);
  });

  it(`Should return to welcome screen after game end`, () => {
    const questionsMock = [
      {
        id: 1,
        type: `artist`,
        song: {
          artist: `Plаcido Domingo`,
          src: ``
        },
        answers: [
          {
            artist: `Plаcido Domingo`,
            image: ``
          }
        ]
      },
    ];

    const AppComponent = mount(
        <App
          gameTime={1}
          maxMistakes={1}
          questions={questionsMock}
          step={0}
          mistakes={0}
          onUserAnswerClick={jest.fn}
          onWelcomeScreenClick={jest.fn}
        />
    );

    const artistScreenForm = AppComponent.find(`.game__artist`);
    expect(artistScreenForm.exists()).toEqual(true);
    artistScreenForm.simulate(`change`);
    AppComponent.setProps({step: -1});

    const startGameButton = AppComponent.find(`.welcome__button`);
    expect(startGameButton.exists()).toEqual(true);
  });
});
