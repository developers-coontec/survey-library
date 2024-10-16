import { frameworks, url_widgets, initSurvey, getSurveyResult } from "../helper";
import { ClientFunction } from "testcafe";
const assert = require("assert");
const title = `sortablejs`;

const json = {
  questions: [
    {
      type: "sortablelist",
      name: "lifepriopity",
      title: "Life Priorities ",
      isRequired: true,
      colCount: 0,
      choices: ["family", "work", "pets", "travels", "games"],
    },
  ],
};

frameworks.forEach((framework) => {
  fixture`${framework} ${title}`
    .page`${url_widgets}${framework}/customWidget.html`.beforeEach(
      async (ctx) => {
        await initSurvey(framework, json);
      }
    );

  test(`check integrity`, async (t) => {
    await t
      .hover(`div[data-value]:nth-child(1)`)
      .hover(`div[data-value]:nth-child(2)`)
      .hover(`div[data-value]:nth-child(3)`)
      .hover(`div[data-value]:nth-child(4)`)
      .hover(`div[data-value]:nth-child(5)`);
  });

  test(`choose empty`, async (t) => {
    const getPosition = ClientFunction(() =>
      document.documentElement.innerHTML.indexOf("Response required.")
    );
    let position;
    let surveyResult;

    await t.click(`input[value=Complete]`);

    position = await getPosition();
    assert.notEqual(position, -1);

    surveyResult = await getSurveyResult();
    assert.equal(typeof surveyResult, `undefined`);
  });

  test(`choose value`, async (t) => {
    // TODO d&d doesn't work https://github.com/DevExpress/testcafe/issues/897
    // let surveyResult;
    //
    // await t
    //     .dragToElement('.source div:nth-child(4)', '.result')
    //     .dragToElement('.source div:nth-child(1)', '.result')
    //     .click(`input[value=Complete]`);
    //
    // surveyResult = await getSurveyResult();
    // assert.deepEqual(surveyResult.lifepriopity, ["travels","family"]);
  });

  test(`change priority`, async (t) => {
    // TODO d&d doesn't work https://github.com/DevExpress/testcafe/issues/897
    // let surveyResult;
    //
    // await t
    //     .dragToElement('.source div:nth-child(1)', '.result')
    //     .dragToElement('.source div:nth-child(2)', '.result')
    //     .dragToElement('.source div:nth-child(3)', '.result')
    //     .dragToElement('.source div:nth-child(4)', '.result')
    //     .dragToElement('.source div:nth-child(5)', '.result')
    //     .dragToElement('.result div:nth-child(1)', '.result div:nth-child(5) div')
    //     .dragToElement('.result div:nth-child(1)', '.result div:nth-child(4) div')
    //     .dragToElement('.result div:nth-child(1)', '.result div:nth-child(3) div')
    //     .dragToElement('.result div:nth-child(1)', '.result div:nth-child(2) div')
    //
    //     .click(`input[value=Complete]`);
    //
    // surveyResult = await getSurveyResult();
    // assert.deepEqual(surveyResult.lifepriopity, ["games","travels","pets","work","family"]);
  });
});
