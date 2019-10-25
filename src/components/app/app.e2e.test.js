import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./app.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`APP screens should switch`, () => {
  const questionsMock = [
    {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          src: ``,
          genre: `rock`
        },
        {
          src: ``,
          genre: `jazz`
        },
        {
          src: ``,
          genre: `pop`
        },
        {
          src: ``,
          genre: `jazz`
        },
      ]
    },
    {
      type: `artist`,
      song: {
        artist: `Plаcido Domingo`,
        src: ``
      },
      answers: [
        {
          artist: `Jose Carreras`,
          image: ``
        },
        {
          artist: `Luciano Pavarotti`,
          image: ``
        },
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
        errorAmount={1}
        questions={questionsMock}
      />
  );
  expect(AppComponent.state(`questionIndex`)).toEqual(-1);

  const startGameButton = AppComponent.find(`.welcome__button`);
  expect(startGameButton.exists()).toEqual(true);
  startGameButton.simulate(`click`);

  expect(AppComponent.state(`questionIndex`)).toEqual(0);
  AppComponent.update();

  const questionGenreScreen = AppComponent.find(`.game--genre`);
  expect(questionGenreScreen.exists()).toEqual(true);

  const genreForm = AppComponent.find(`.game__tracks`);
  expect(genreForm.exists()).toEqual(true);
  genreForm.simulate(`submit`, {preventDefault: ()=>{}});

  expect(AppComponent.state(`questionIndex`)).toEqual(1);
  AppComponent.update();

  const questionArtistScreen = AppComponent.find(`.game--artist`);
  expect(questionArtistScreen.exists()).toEqual(true);

  const artistForm = AppComponent.find(`.game__artist`);
  expect(artistForm.exists()).toEqual(true);
  artistForm.simulate(`change`);

  expect(AppComponent.state(`questionIndex`)).toEqual(-1);
});
