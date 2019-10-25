import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`render correctly App component`, () => {
  const questionsMock = [
    {
      type: `genre`,
      genre: `pop`,
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
          genre: `pop`
        }
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
          artist: `Luciano Pavarotti`,
          image: ``
        },
        {
          artist: `Plаcido Domingo`,
          image: ``
        },
        {
          artist: `Jose Carreras`,
          image: ``
        }
      ]
    }
  ];

  const snapshot = renderer
    .create(
        <App
          gameTime={1}
          errorAmount={1}
          questions={questionsMock}
        />
    )
    .toJSON();

  expect(snapshot).toMatchSnapshot();
});
