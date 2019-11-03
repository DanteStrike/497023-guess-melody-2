import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./app.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "../../reducer/reducer";

jest.useFakeTimers();

Enzyme.configure({adapter: new Adapter()});

HTMLAudioElement.prototype.pause = () => { /* do nothing */ };

describe(`APP screens should switch`, () => {
  it(`Should welcome screen to first question on start game button click`, () => {
    const store = createStore(reducer);
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
        <Provider store={store}>
          <App
            gameTimeMinutes={1}
            maxMistakes={1}
            questions={questionsMock}
          />
        </Provider>
    );

    const startGameButton = AppComponent.find(`.welcome__button`);
    expect(startGameButton.exists()).toEqual(true);
    startGameButton.simulate(`click`);

    const questionGenreScreen = AppComponent.find(`.game--genre`);
    expect(questionGenreScreen.exists()).toEqual(true);
  });

  it(`Should switch questions screens on user answer`, () => {
    const store = createStore(reducer, {
      step: 0,
      mistakes: 0,
      gameTimeLeft: 20
    });
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
        <Provider store={store}>
          <App
            gameTimeMinutes={10}
            maxMistakes={2}
            questions={questionsMock}
          />
        </Provider>
    );

    const genreScreenForm = AppComponent.find(`.game__tracks`);
    expect(genreScreenForm.exists()).toEqual(true);
    genreScreenForm.simulate(`submit`, {
      preventDefault: ()=>{}
    });

    const questionArtistScreen = AppComponent.find(`.game--artist`);
    expect(questionArtistScreen.exists()).toEqual(true);
  });

  it(`Should switch to win screen on game complete`, () => {
    const store = createStore(reducer, {
      step: 0,
      mistakes: 0,
      gameTimeLeft: 20
    });
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
        <Provider store={store}>
          <App
            gameTimeMinutes={10}
            maxMistakes={2}
            questions={questionsMock}
          />
        </Provider>
    );

    const artistInput = AppComponent.find(`#answer-0`);
    expect(artistInput.exists()).toEqual(true);
    artistInput.simulate(`change`);

    const resetGameButton = AppComponent.find(`.login .replay`);
    expect(resetGameButton.exists()).toEqual(true);

    resetGameButton.simulate(`click`);

    const startGameButton = AppComponent.find(`.welcome__button`);
    expect(startGameButton.exists()).toEqual(true);
  });

  it(`Should switch ques screen to game over screen on timeout (store.gameTime === 0)`, () => {
    const store = createStore(reducer, {
      step: 0,
      mistakes: 0,
      gameTimeLeft: 0
    });
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
        <Provider store={store}>
          <App
            gameTimeMinutes={10}
            maxMistakes={2}
            questions={questionsMock}
          />
        </Provider>
    );

    const resetGameButton = AppComponent.find(`.replay`);
    expect(resetGameButton.exists()).toEqual(true);

    resetGameButton.simulate(`click`);

    const startGameButton = AppComponent.find(`.welcome__button`);
    expect(startGameButton.exists()).toEqual(true);
  });

  it(`Should switch ques screen to game over screen on mistakes > maxMistakes`, () => {
    const store = createStore(reducer, {
      step: 0,
      mistakes: 3,
      gameTimeLeft: 10
    });
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
        <Provider store={store}>
          <App
            gameTimeMinutes={10}
            maxMistakes={2}
            questions={questionsMock}
          />
        </Provider>
    );

    const resetGameButton = AppComponent.find(`.result .replay`);
    expect(resetGameButton.exists()).toEqual(true);

    resetGameButton.simulate(`click`);

    const startGameButton = AppComponent.find(`.welcome__button`);
    expect(startGameButton.exists()).toEqual(true);
  });
});
