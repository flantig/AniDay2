import "mocha";
const commands = require("../src/helpers/commands");
import * as assert from "assert";

describe("index", ()=>{

    it("should say 'What's up?'", ()=>{
        console.log("What's up?");
        commands.test();
        assert.ok(true);
    })


});