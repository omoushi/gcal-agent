#!/usr/bin/env bash

npx clasp run doProcess --params "[$(cat test/resources/example_event_parameter.json), $(cat test/resources/example_script_properties.json)]"