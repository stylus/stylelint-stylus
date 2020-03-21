"use strict"

const path = require("path")
const ruleTester = require("../../utils/tester")

ruleTester(
    "stylus/semicolon",
    path.resolve(__dirname, "../../fixtures/lib/rules/semicolon")
)
