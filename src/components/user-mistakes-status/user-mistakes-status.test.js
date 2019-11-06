import React from "react";
import renderer from "react-test-renderer";
import {UserMistakesStatus} from "./user-mistakes-status";

it(`render correctly UserMistakesStatus component`, () => {
  const component = renderer
    .create(
        <UserMistakesStatus
          mistakes={3}
        />
    );

  expect(component).toMatchSnapshot();
});
