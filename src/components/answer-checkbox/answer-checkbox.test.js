import React from "react";
import renderer from "react-test-renderer";
import AnswerCheckBox from "./answer-checkbox.jsx";

it(`Should render correctly AnswerCheckBox component`, () => {
  const component = renderer
    .create(
        <AnswerCheckBox
          id={1}
          value={`checkbox`}
          checked={false}
          onChange={() => {}}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
