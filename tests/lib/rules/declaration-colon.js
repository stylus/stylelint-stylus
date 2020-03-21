"use strict"

const path = require("path")
const ruleTester = require("../../utils/tester")

ruleTester(
    "stylus/declaration-colon",
    path.resolve(__dirname, "../../fixtures/lib/rules/declaration-colon")
)
