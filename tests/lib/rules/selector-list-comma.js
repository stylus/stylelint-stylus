"use strict"

const path = require("path")
const ruleTester = require("../../utils/tester")

ruleTester(
    "stylus/selector-list-comma",
    path.resolve(__dirname, "../../fixtures/lib/rules/selector-list-comma")
)
