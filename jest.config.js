import {pathsToModuleNameMapper} from 'ts-jest'

import {default as config} from './tsconfig.json' assert {type: 'json'}

const {compilerOptions} = config

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl].filter(Boolean),
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
}
