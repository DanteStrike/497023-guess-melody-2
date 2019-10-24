import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./app.jsx";

Enzyme.configure({adapter: new Adapter()});

// it(`screens should free switch if user is answering right`, () => {
//   const questionsMock = [
//     {
//       song: {
//         artist: `Plаcido Domingo`,
//         src: ``
//       },
//       answers: [
//         {
//           artist: `Jose Carreras`,
//           image: ``
//         },
//         {
//           artist: `Luciano Pavarotti`,
//           image: ``
//         },
//         {
//           artist: `Plаcido Domingo`,
//           image: ``
//         }
//       ]
//     },
//     {
//       genre: `jazz`,
//       answers: [
//         {
//           src: ``,
//           genre: `rock`
//         },
//         {
//           src: ``,
//           genre: `jazz`
//         },
//         {
//           src: ``,
//           genre: `pop`
//         },
//         {
//           src: ``,
//           genre: `jazz`
//         },
//       ]
//     },
//     {
//       song: {
//         artist: `Plаcido Domingo`,
//         src: ``
//       },
//       answers: [
//         {
//           artist: `Jose Carreras`,
//           image: ``
//         },
//         {
//           artist: `Luciano Pavarotti`,
//           image: ``
//         },
//         {
//           artist: `Plаcido Domingo`,
//           image: ``
//         }
//       ]
//     }
//   ];
//
//   const AppComponent = mount(
//       <App
//         gameTime={1}
//         errorAmount={1}
//         questions={questionsMock}
//       />
//   );
//
//   const startGameButton = AppComponent.find(`.welcome__button`);
//   expect(startGameButton).toHaveLength(1);
//   expect(startGameButton.exists()).toEqual(true);
//
//   startGameButton.simulate(`click`);
//
//   AppComponent.update();
//
//   const questionGenreScreen = AppComponent.find(`.welcome__button`);
//   expect(questionGenreScreen).toHaveLength(0);
//   expect(questionGenreScreen.exists()).toEqual(true);
// });
