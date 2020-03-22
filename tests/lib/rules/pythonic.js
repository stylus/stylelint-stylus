"use strict"

const path = require("path")
const ruleTester = require("../../utils/tester")

ruleTester(
    "stylus/pythonic",
    path.resolve(__dirname, "../../fixtures/lib/rules/pythonic")
)
