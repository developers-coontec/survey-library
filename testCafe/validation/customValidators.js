import { frameworks, url, initSurvey, getSurveyResult } from "../helper";
import { Selector, ClientFunction } from "testcafe";
const assert = require("assert");
const title = `customValidators`;

const setupSurvey = ClientFunction(() => {
  function __extends(thisClass, baseClass) {
    for (var p in baseClass)
      if (baseClass.hasOwnProperty(p)) thisClass[p] = baseClass[p];
    function __() {
      this.constructor = thisClass;
    }
    thisClass.prototype =
      baseClass === null
        ? Object.create(baseClass)
        : ((__.prototype = baseClass.prototype), new __());
  }
  
  var MyTextValidator = (function(_super) {
    __extends(MyTextValidator, _super);
    function MyTextValidator() {
      _super.call(this);
    }
    MyTextValidator.prototype.getType = function() {
      return "mytextvalidator";
    };
    MyTextValidator.prototype.validate = function(value, name) {
      if (value.indexOf("survey") < 0) {
        //report an error
        return new Survey.ValidatorResult(
          null,
          new Survey.CustomError(this.getErrorText(name))
        );
      }
      //return Survey.ValidatorResult object if you want to correct the entered value
      // return new Survey.ValidatorResult(youCorrectedValue);
      //return nothing if there is no any error.
      return null;
    };
    //the default error text. It shows if user do not set the 'text' property
    MyTextValidator.prototype.getDefaultErrorText = function(name) {
      return "You text should contains 'survey' word.";
    };
    return MyTextValidator;
  })(Survey.SurveyValidator);
  Survey.MyTextValidator = MyTextValidator;
  //add into survey Json metaData
  Survey.Serializer.addClass(
    "mytextvalidator",
    [],
    function() {
      return new MyTextValidator();
    },
    "surveyvalidator"
  );
});

const json = {
  questions: [
    {
      type: "comment",
      name: "memo",
      isRequired: true,
      title: "Type here 'survey' to pass the validation ",
      validators: [{ type: "mytextvalidator" }]
    }
  ]
};

frameworks.forEach(framework => {
  fixture`${framework} ${title}`.page`${url}${framework}`.beforeEach(
    async t => {
      await setupSurvey();
      await initSurvey(framework, json);
    }
  );

  test(`check validation`, async t => {
    const getError1Div = Selector(() => document.querySelectorAll("div"), {
      text: "Response required.",
      visibilityCheck: true,
      timeout: 1000
    });
    const getError2Div = Selector(() => document.querySelectorAll("div"), {
      text: "You text should contains 'survey' word.",
      visibilityCheck: true,
      timeout: 1000
    });
    let surveyResult;

    await t.click(`input[value="Complete"]`);

    assert(await getError1Div());

    await t.typeText(`textarea`, `wombat`).click(`input[value="Complete"]`);

    assert(await getError2Div());

    await t.typeText(`textarea`, ` survey`).click(`input[value="Complete"]`);

    surveyResult = await getSurveyResult();
    assert.deepEqual(surveyResult, { memo: "wombat survey" });
  });
});
