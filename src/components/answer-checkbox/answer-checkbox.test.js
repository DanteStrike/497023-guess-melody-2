import React from "react";
import renderer from "react-test-renderer";
import AnswerCheckbox from "./answer-checkbox.jsx";

it(`Should render correctly AnswerCheckBox component`, () => {
  const component = renderer
    .create(
        <AnswerCheckbox
          id={1}
          value={`checkbox`}
          checked={false}
          onChange={() => {}}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
